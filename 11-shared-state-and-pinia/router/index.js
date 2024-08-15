import { createRouter, createWebHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHistory('/11-shared-state-and-pinia/'),

  routes: [
    {
      path: '/',
      name: 'index',
      // alias: 'meetups', - можно было сделать два адреса одной странице
      component: () => import('../views/PageMeetups.vue'),
    },
    {
      path: '/meetups',
      name: 'meetups',
      // Пока отдельно страницы митапов и главной - нет
      // Сделаем на будущее два маршрута, но маршрут страницы митапов будет перенаправлять на главную
      redirect: { name: 'index' },
    },
    {
      path: '/meetups/:meetupId(\\d+)',
      name: 'meetup',
      meta: {
        showReturnToMeetups: true,
      },
      // Все параметры маршрута (meetupId) будут устанавливаться соответственными пропсами компонента
      props: (to) => ({
        meetupId: Number(to.params.meetupId),
      }),
      component: () => import('../views/PageMeetup.vue'),
    },
    {
      path: '/meetups/create',
      name: 'create-meetup',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/PageLogin.vue'),
    },
    {
      path: '/user',
      name: 'user',
      redirect: () => ({ name: 'user.profile' }),
      component: () => import('../views/PageUser.vue'),
      children: [
        {
          path: '',
          alias: '/profile',
          name: 'user.profile',
          component: () => import('../views/PageUserProfile.vue')
        },
        {
          path: 'security',
          name: 'user.security',
          component: () => import('../views/PageUserSecurity.vue')
        },
        {
          path: 'settings',
          name: 'user.settings',
          component: () => import('../views/PageUserSettings.vue')
        }
      ]
    }
  ]
})
