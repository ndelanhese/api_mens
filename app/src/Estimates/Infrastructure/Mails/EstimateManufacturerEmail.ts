import { emailData, productData } from './EstimateEmail.types';

const tableHTML = (products: productData[]): string => {
  return products
    .map(
      (item) =>
        `
      <tr>
        <td>${item.partNumber}</td>
        <td>${item.description} </td>
        <td>${item.qtd}</td>
        <td>${item.currency} ${item.exemptPrice}</td>
        <td>${item.currency} ${item.qtd * item.exemptPrice}</td>
      </tr>
      `,
    )
    .join('');
};

export const makeEmailManufacturerBody = (data: emailData) => {
  return `<!DOCTYPE html>
<html lang="pt-br">
  <style>
    th,
    td {
      text-align: center;
      border: 1px solid black;
      padding: 8px;
    }
    table {
      border-spacing: 0.2rem;
      width: 100%;
      border: 1px solid #ddd;
    }

  </style>
  <body
    style="
      font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
      line-height: 1.5rem;
    "
  >
    <h3>DADOS DA REVENDA</h3>
    <p><span style="font-weight: bold">Nome do contato:</span> ${data.name}</p>
    <p><span style="font-weight: bold">E-mail do contato:</span>
    <a href="mailto:${data.email}">${data.email}</a>
    </p>
    <p><span style="font-weight: bold">Telefone do contato:</span> ${
      data.phone
    }</p>
    <p><span style="font-weight: bold">Razão social:</span> ${
      data.corporateName
    }</p>
    <p><span style="font-weight: bold">UF:</span> ${data.uf}</p>
    <p><span style="font-weight: bold">CNPJ:</span> ${data.cnpj}</p>
    <hr />
    <p><span style="font-weight: bold">Finalidade:</span> Revender </p>
    <div class="tableA-responsive">
    <table>
      <tr>
        <th>PN</th>
        <th>DESCRIÇÃO</th>
        <th>QTD</th>
        <th>PREÇO</th>
        <th>TOTAL</th>
      </tr>
      ${tableHTML(data.products)}
    </table>
    </div>
    <p>
      Valores Base Revenda, não incluso percentual de comissão a ser trabalhado
      pelo Canal!
    </p>
     Obrigado!
    </p>
      Time ScanSource
    </p>
  </body>
</html>
`;
};
