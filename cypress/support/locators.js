const locators = {
  login: {
    field_user: '[data-test=email]',
    field_pass: '[data-test=passwd]',
    btn_login: 'button[type=submit]'
  },
  contas: {
    header: 'h2',
    field_account_name: '[data-test=nome]',
    btn_save: '.btn',
    xp_btn_edit_conta_extrato: `//table//td[contains(.,'Conta para extrato')]/..//i[@class='far fa-edit']`
  },
  menu: {
    option_settings: '[data-test=menu-settings]',
    option_contas: 'a[href="/contas"]',
    option_resetar: 'a[href="/reset"]'
  },
  toast: {
    info: '.toast-info',
    success: '.toast-success',
    error: '.toast-error'
  }
}

export default locators;
