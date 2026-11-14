
export function verificationEmail(name, verificationUrl) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>

  <body style="margin:0;padding:0;background:#f4f6f8;font-family:Arial,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0"
      style="padding:40px 15px;background:#f4f6f8;">

      <tr>
        <td align="center">

          <table width="100%" cellpadding="0" cellspacing="0"
            style="max-width:520px;background:#fff;border-radius:12px;">

            <tr>
              <td align="center" style="padding:35px 25px 15px;">
                <h1 style="color:#2563eb;margin:0;">YourApp</h1>
              </td>
            </tr>

            <tr>
              <td style="padding:20px 35px 35px;color:#374151;">

                <h2 style="text-align:center;color:#111827;">
                  Verify Your Email
                </h2>

                <p>Hello <strong>${escapeHtml(name)}</strong>,</p>

                <p style="line-height:1.7;">
                  Thanks for creating an account!
                  Please verify your email address by clicking below.
                </p>

                <div style="text-align:center;margin:30px 0;">
                  <a href="${escapeHtml(verificationUrl)}"
                    style="background:#2563eb;color:#fff;
                    padding:14px 30px;border-radius:7px;
                    text-decoration:none;font-weight:bold;">
                    Verify Email
                  </a>
                </div>

                <p style="font-size:13px;color:#6b7280;">
                  This link expires in 15 minutes.
                </p>

                <p style="font-size:13px;color:#6b7280;">
                  If the button doesn't work, copy this link:
                </p>

                <a href="${escapeHtml(verificationUrl)}"
                  style="font-size:12px;word-break:break-all;color:#2563eb;">
                  ${escapeHtml(verificationUrl)}
                </a>

                <hr style="border:0;border-top:1px solid #eee;margin:25px 0;">

                <p style="font-size:13px;color:#9ca3af;">
                  If you didn't create this account, ignore this email.
                </p>

              </td>
            </tr>

            <tr>
              <td align="center"
                style="padding:20px;background:#f9fafb;color:#9ca3af;font-size:12px;">
                © ${new Date().getFullYear()} YourApp. All rights reserved.
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}

function escapeHtml(value = "") {
    return String(value).replace(/[&<>"']/g, (char) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
    })[char]);
}
