export type AgendaItemsTypes =
  | 'registration'
  | 'opening'
  | 'talk'
  | 'break'
  | 'coffee'
  | 'closing'
  | 'afterparty'
  | 'other'

export type MeetupAgendaItemDTO = {
  /** ID пункта программы */
  id: number

  /** Время начала в формате HH:MM */
  startsAt: string

  /** Время окончания в формате HH:MM */
  endsAt: string

  /** Тип пункта программы */
  type: AgendaItemsTypes

  /** Заголовок при наличии */
  title: string | null

  /** Описание при наличии */
  description: string | null

  /** Имя докладчика для типа talk */
  speaker: string | null

  /** Язык доклада для типа talk */
  language: string | null
}

export type MeetupDTO = {
  /** ID митапа */
  id: string

  /** Название митапа */
  title: string

  /** Описание митапа */
  description: string

  /**
   * ID изображения митапа
   * @deprecated
   */
  imageId: number

  /** Ссылка на изображение митапа */
  image: string

  /** Место проведения митапа */
  place: string

  /** Организатор митапа */
  organizer: string

  /** Дата митапа в формате UNIX Timestamp в 00:00:00.000 по UTC */
  date: number

  /** Дата митапа в формате YYYY-MM-DD по UTC */
  dateIso: string

  /** Для авторизованного пользователя - является ли текущий пользователь организатором митапа */
  organizing?: boolean

  /** Для авторизованного пользователя - является ли текущий пользователь участником митапа */
  attending?: boolean

  /** Программа митапа */
  agenda: MeetupAgendaItemDTO[]
}

export type CreateAgendaItemDTO = {
  /** Время начала в формате HH:MM */
  startsAt: string

  /** Время окончания в формате HH:MM */
  endsAt: string

  /** Тип пункта программы */
  type: AgendaItemsTypes

  /** Заголовок при наличии */
  title?: string | null

  /** Описание при наличии */
  description?: string | null

  /** Имя докладчика для типа talk */
  speaker?: string

  /** Язык доклада для типа talk */
  language?: string
}

export type CreateMeetupDTO = {
  /** Название митапа */
  title: string

  /** Описание митапа */
  description: string

  /** Место проведения митапа */
  place: string

  /** Дата митапа строкой в формате YYYY-MM-DD или числом UNIX timestamp в полночь по UTC */
  date: string | number

  /** ID загруженного изображения митапа */
  imageId: number

  /** Программа митапа */
  agenda: CreateAgendaItemDTO[]
}

export type UserDTO = {
  /** ID пользователя */
  id: number

  /** Полное имя */
  fullname: string

  /** Email */
  email: string

  /** Ссылка на аватар в сервисе gravatar */
  avatar: string
}

export type LoginDTO = {
  /** Email */
  email: string

  /** Пароль */
  password: string
}

export type RegisterDTO = {
  /** Email */
  email: string

  /** Пароль */
  password: string

  /** Полное имя */
  fullname: string
}

export type ImageDTO = {
  /** ID изображения */
  id: number

  /** Ссылка на изображение */
  url: string
}
