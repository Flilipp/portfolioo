const resendApiKey = process.env.RESEND_API_KEY;
const contactToEmail = process.env.CONTACT_TO_EMAIL;
const contactFromEmail = process.env.CONTACT_FROM_EMAIL;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method not allowed' });
  }

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    return res.status(500).json({
      message: 'Missing RESEND_API_KEY, CONTACT_TO_EMAIL or CONTACT_FROM_EMAIL environment variables',
      hint: 'Ustaw te zmienne w Vercel w sekcji Project Settings -> Environment Variables i podaj zweryfikowany adres nadawcy. Może to być także Gmail, jeśli Resend go zaakceptuje jako verified sender.',
    });
  }

  let payload = req.body || {};
  if (typeof payload === 'string') {
    try {
      payload = JSON.parse(payload);
    } catch {
      return res.status(400).json({ message: 'Invalid JSON payload' });
    }
  }

  const name = (payload.name || '').trim();
  const email = (payload.email || '').trim();
  const message = (payload.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: email,
        subject: `Nowy lead z portfolio: ${name}`,
        text: buildPlainTextEmail({ name, email, message }),
        html: `
          <div style="margin:0;background:#f4f1ea;padding:32px 16px;font-family:Inter,Arial,sans-serif;color:#111827;">
            <div style="max-width:640px;margin:0 auto;background:#111111;border:1px solid rgba(200,169,110,.25);border-radius:24px;overflow:hidden;box-shadow:0 24px 70px rgba(0,0,0,.18);">
              <div style="padding:28px 28px 20px;background:linear-gradient(135deg,#111111 0%,#1a1712 100%);border-bottom:1px solid rgba(200,169,110,.16);">
                <div style="font-size:12px;letter-spacing:.22em;text-transform:uppercase;color:#c8a96e;margin-bottom:12px;">Filip & Wiktor</div>
                <h1 style="margin:0;color:#ffffff;font-size:28px;line-height:1.15;">Nowy lead z formularza kontaktowego</h1>
                <p style="margin:10px 0 0;color:#9ca3af;font-size:14px;line-height:1.6;">Ktoś chce się z Wami skontaktować przez portfolio. Poniżej pełne dane i treść wiadomości.</p>
              </div>

              <div style="padding:24px 28px 8px;background:#111111;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                  <tr>
                    <td style="padding:0 0 16px 0;">
                      <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c8a96e;margin-bottom:6px;">Nadawca</div>
                      <div style="font-size:18px;font-weight:700;color:#ffffff;">${escapeHtml(name)}</div>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 0 16px 0;">
                      <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c8a96e;margin-bottom:6px;">Email do odpowiedzi</div>
                      <a href="mailto:${escapeHtml(email)}" style="font-size:16px;color:#93c5fd;text-decoration:none;word-break:break-word;">${escapeHtml(email)}</a>
                    </td>
                  </tr>
                </table>
              </div>

              <div style="padding:0 28px 28px;background:#111111;">
                <div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c8a96e;margin-bottom:10px;">Wiadomość</div>
                <div style="background:#161616;border:1px solid rgba(255,255,255,.08);border-radius:18px;padding:18px 18px;white-space:pre-wrap;font-size:15px;line-height:1.75;color:#e5e7eb;">${escapeHtml(message)}</div>

                <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:20px;">
                  <div style="flex:1;min-width:150px;background:rgba(200,169,110,.08);border:1px solid rgba(200,169,110,.15);border-radius:16px;padding:14px 16px;">
                    <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#c8a96e;margin-bottom:4px;">Odpowiedź</div>
                    <div style="font-size:14px;color:#f9fafb;">Odpowiedz bezpośrednio z maila</div>
                  </div>
                  <div style="flex:1;min-width:150px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px 16px;">
                    <div style="font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:#9ca3af;margin-bottom:4px;">Źródło</div>
                    <div style="font-size:14px;color:#f9fafb;">Portfolio contact form</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      let providerError = null;

      if (errorText) {
        try {
          providerError = JSON.parse(errorText);
        } catch {
          providerError = { message: errorText };
        }
      }

      const providerMessage = providerError?.message || providerError?.error || 'Resend returned an error';

      return res.status(502).json({
        message: 'Failed to send email',
        details: providerMessage,
        provider: 'resend',
        providerStatus: emailResponse.status,
      });
    }

    return res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    return res.status(500).json({
      message: 'Unexpected server error',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function buildPlainTextEmail({ name, email, message }) {
  return [
    'Nowy lead z formularza kontaktowego',
    '',
    `Nadawca: ${name}`,
    `Email: ${email}`,
    '',
    'Wiadomość:',
    message,
    '',
    'Odpowiedz bezpośrednio na ten email.',
  ].join('\n');
}