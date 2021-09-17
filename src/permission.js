import router from '@/router/index'
import dayjs from 'dayjs'

router.beforeEach((to, from, next) => {
  if (to.name === 'Home') {
    next()
    return
  }

  if (dayjs().isBefore(dayjs('2021-10-01'))) {
    next()
    return
  }

  next('/')
})
