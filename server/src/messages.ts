import * as dayjs from 'dayjs'

import { IMessageFormated } from "./dtos/messageDTO"

const formatMessage = (user: string, text: string): IMessageFormated => {
    return {
        user,
        text,
        time: dayjs().format('h:m a')
    }
}

export default formatMessage