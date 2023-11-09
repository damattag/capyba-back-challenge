export default function mailTemplate(name: string, token: string) {
  const html = `
  <div style="background-color: #f5f5f5; padding: 20px; font-family: Arial, Helvetica, sans-serif; font-size: 16px;">
    <div style="background-color: #fff; padding: 20px; border-radius: 5px;">
      <h1 style="text-align: center; color: #333;">Olá, ${name}!</h1>
      <p style="text-align: center; color: #333;">Para alterar sua senha, use o token abaixo, ele tem validade de uma hora.</p>
      <p style="text-align: center; color: #333;">Token: ${token}</p>
      <p style="text-align: center; color: #333;">Se você não solicitou uma alteração de senha, ignore este email.</p>
    </div>
  </div>
  `;

  return html;
}
