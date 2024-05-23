import { test, expect } from "./enterpriseFixture";

// Definindo uma suíte de testes que será executada em sequência
test.describe.serial("Enterprise Tests", () => {
  // Teste para criar um empreendimento
  test("create enterprise", async ({ page, enterpriseId }) => {
    // Navega para a página de registro do empreendimento
    await page.goto("/register-enterprise", { waitUntil: "networkidle" });

    // Seleciona o status do empreendimento
    await page.getByLabel('Lançamento').click();
    await page.getByRole("option", { name: "Breve lançamento" }).click();

    // Preenche o nome do empreendimento
    await page
      .getByPlaceholder("Nome do Empreendimento")
      .fill("Empreendimento Teste");

    // Seleciona o objetivo do empreendimento
    await page.getByLabel('Residencial').click();
    await page.getByRole("option", { name: "Comercial" }).click();

    // Preenche o CEP e espera um tempo para carregamento dos dados
    await page.getByPlaceholder("CEP").fill("70150900");
    await page.waitForLoadState();
    await page
      .getByPlaceholder("Número")
      .fill(`${Math.floor(Math.random() * 10)}`);

    // Clica no botão de cadastrar
    await page.getByRole("button", { name: "Cadastrar" }).click();
    await page.waitForLoadState("networkidle");

    // Verifica se a mensagem de sucesso apareceu
    const toast = page.getByText("Empreendimento criado com sucesso");
    await expect(toast).toBeVisible();

    // Pega o ID do empreendimento criado
    const enterpriseElement = await page.waitForSelector(
      "[data-enterprise-id]"
    );
    const id = await enterpriseElement.getAttribute("data-enterprise-id");

    // Armazena o ID do empreendimento para uso nos próximos testes
    enterpriseId.set(id);
  });

  // Teste para editar o empreendimento
  test("edit enterprise", async ({ page, enterpriseId }) => {
    // Pega o ID do empreendimento criado no teste anterior
    const id = await enterpriseId.get();

    // Navega para a página inicial
    await page.goto("/", { waitUntil: "networkidle" });

    // Clica no ícone de edição do empreendimento correspondente
    await page
      .locator(`[data-enterprise-id="${id}"]`)
      .locator("img[alt='Icone de Lapis']")
      .click();

    // Altera o nome do empreendimento
    await page
      .getByPlaceholder("Nome do Empreendimento")
      .fill(`Empreendimento Editado`);
    await page.getByRole("button", { name: "Editar" }).click();

    // Espera o carregamento da página e verifica a mensagem de sucesso
    await page.waitForLoadState("networkidle");
    const toast = page.getByText("Empreendimento atualizado com sucesso");
    await expect(toast).toBeVisible();
  });

  // Teste para excluir o empreendimento
  test("delete enterprise", async ({ page, enterpriseId }) => {
    // Pega o ID do empreendimento criado no teste anterior
    const id = await enterpriseId.get();

    // Navega para a página inicial
    await page.goto("/", { waitUntil: "networkidle" });

    // Clica no ícone de lixeira do empreendimento correspondente
    await page
      .locator(`[data-enterprise-id="${id}"]`)
      .locator("img[alt='Icone de Lixeira']")
      .click();
    await page.getByRole("button", { name: "Confirmar" }).click();

    // Espera o carregamento da página e verifica a mensagem de sucesso
    await page.waitForLoadState("networkidle");
    const toast = page.getByText("Empreendimento excluído com sucesso");
    await expect(toast).toBeVisible();
  });
});
