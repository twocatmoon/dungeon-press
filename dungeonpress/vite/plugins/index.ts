import adventure from './virtual/adventure'
import config from './virtual/config'
import icons from './virtual/icons'

export default function () {
    return [
        adventure(),
        config(),
        icons(),
    ]
}
