let envConfig = {}

/* @if NODE_ENV=='production' */
envConfig = {
    DEV: 'http://127.0.0.1:8000'
}
/* @endif */

/* @if NODE_ENV=='development' */
envConfig = {
    DEV: 'http://127.0.0.1/api/'
}
/* @endif */

/* @if NODE_ENV=='build' */
envConfig = {
    DEV: 'http://139.129.227.215/surfboard/'
}
/* @endif */

export default {
    envConfig
}
