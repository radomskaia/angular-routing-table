const SPRITE_PATH = './sprite.svg#';
export const ICON_PATH = {
  FIRST: SPRITE_PATH + 'doubleArrowLeft',
  LAST: SPRITE_PATH + 'doubleArrowRight',
  NEXT: SPRITE_PATH + 'arrowRight',
  NOT_FOUND: SPRITE_PATH + 'notFound',
  PREVIOUS: SPRITE_PATH + 'arrowLeft',
  SORT: SPRITE_PATH + 'sort',
} as const;
export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
} as const;
