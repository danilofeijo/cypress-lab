const locators = {
  login: {
    field_user: '[data-test=email]',
    field_pass: '[data-test=passwd]',
    btn_login: 'button[type=submit]'
  },
  menu: {
    option_home: '[data-test=menu-home]',
    option_movimentacao: '[data-test=menu-movimentacao]',
    option_settings: '[data-test=menu-settings]',
    option_contas: 'a[href="/contas"]',
    option_resetar: 'a[href="/reset"]'
  },
  home: {
    fn_xp_saldo_conta: nomeConta => `//td[contains(.,'${nomeConta}')]/../td[2]`,
  },
  movimentacao: {
    btn_tipo_receita: '[data-test=tipo-receita]',
    btn_tipo_despesa: '[data-test=tipo-despesa]',
    date_transacao: '[data-test=data-transacao]',
    date_pagamento: '[data-test=data-pagamento]',
    field_descricao: '[data-test=descricao]',
    field_valor: '[data-test=valor]',
    field_interessado: '[data-test=envolvido]',
    select_conta: '[data-test=conta]',
    btn_status: '[data-test=status]',
    btn_salvar: '.btn-primary'
  },
  extrato: {
    item: '.list-group li',
    fn_xp_movimentacao_item: (description, value) => `//span[contains(.,'${description}')]/following-sibling::small[contains(.,'${value}')]`,
    fn_xp_movimentacao_delete: (description) => `//span[contains(.,'${description}')]/../../..//i[contains(@class, 'fa-trash-alt')]`
  },
  contas: {
    header: 'h2',
    field_account_name: '[data-test=nome]',
    btn_save: '.btn',
    xp_btn_edit_conta_extrato: `//table//td[contains(.,'Conta para extrato')]/..//i[@class='far fa-edit']`
  },
  toast: {
    info: '.toast-info',
    success: '.toast-success',
    error: '.toast-error'
  }
}

export default locators;
