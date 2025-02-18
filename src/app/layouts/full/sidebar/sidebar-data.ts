import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },

  {
    divider: true,
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'solar:lock-keyhole-minimalistic-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Login',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/login',
      },
    ],
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication',
    children: [
      {
        displayName: 'Register',
         subItemIcon: true,
        iconName: 'solar:round-alt-arrow-right-line-duotone',
        route: '/authentication/register',
      },
    ],
  }, 

  // {
  //   divider: true,
  //   navCap: 'Apps',
  // },
  // {
  //   displayName: 'Contacts',
  //   iconName: 'solar:phone-line-duotone',
  //   route: 'https://matdash-angular-main.netlify.app/apps/contacts',
  //   chip: true,
  //   external: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: 'PRO',
  // },

  // {
  //   navCap: 'Ui Components',
  //   divider: true
  // },
  // {
  //   displayName: 'Badge',
  //   iconName: 'solar:archive-minimalistic-line-duotone',
  //   route: '/ui-components/badge',
  // },
  // {
  //   displayName: 'Chips',
  //   iconName: 'solar:danger-circle-line-duotone',
  //   route: '/ui-components/chips',
  // },
  // {
  //   displayName: 'Lists',
  //   iconName: 'solar:bookmark-square-minimalistic-line-duotone',
  //   route: '/ui-components/lists',
  // },
  // {
  //   displayName: 'Menu',
  //   iconName: 'solar:file-text-line-duotone',
  //   route: '/ui-components/menu',
  // },
  // {
  //   displayName: 'Tooltips',
  //   iconName: 'solar:text-field-focus-line-duotone',
  //   route: '/ui-components/tooltips',
  // },
  // {
  //   displayName: 'Forms',
  //   iconName: 'solar:file-text-line-duotone',
  //   route: '/ui-components/forms',
  // },
  // {
  //   displayName: 'Tables',
  //   iconName: 'solar:tablet-line-duotone',
  //   route: '/ui-components/tables',
  // },

  // {
  //   navCap: 'Extra',
  //   divider: true
  // },
  // {
  //   displayName: 'Icons',
  //   iconName: 'solar:sticker-smile-circle-2-line-duotone',
  //   route: '/extra/icons',
  // },
  // {
  //   displayName: 'Sample Page',
  //   iconName: 'solar:planet-3-line-duotone',
  //   route: '/extra/sample-page',
  // },

  // {
  //   divider: true,
  //   navCap: 'Forms',
  // },
  // {
  //   displayName: 'Form elements',
  //   iconName: 'solar:password-minimalistic-input-line-duotone',
  //   route: 'forms/forms-elements',
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: 'PRO',
  // },
  // {
  //   displayName: 'Form Layouts',
  //   iconName: 'solar:file-text-line-duotone',
  //   route: 'https://matdash-angular-main.netlify.app/forms/form-layouts',
  //   external: true,
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: 'PRO',
  // },
  // {
  //   displayName: 'Form Horizontal',
  //   iconName: 'solar:align-horizonta-spacing-line-duotone',
  //   route: 'https://matdash-angular-main.netlify.app/forms/form-horizontal',
  //   external: true,
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: 'PRO',
  // },

  // {
  //   divider: true,
  //   navCap: 'Tables',
  // },
  // {
  //   displayName: 'Data table',
  //   iconName: 'solar:database-line-duotone',
  //   route: 'https://matdash-angular-main.netlify.app/datatable/kichen-sink',
  //   external: true,
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: 'PRO',
  // },

  // {
  //   divider: true,
  //   navCap: 'Chart',
  // },
  // {
  //   displayName: 'Line',
  //   iconName: 'solar:align-top-line-duotone',
  //   route: 'https://matdash-angular-main.netlify.app/charts/line',
  //   external: true,
  //   chip: true,
  //   chipClass: 'bg-secondary text-white',
  //   chipContent: 'PRO',
  // },
];
