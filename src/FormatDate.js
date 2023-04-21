function formatDate(date){
    let format =date.replace(/T|Z/g, ' ')
    date = format.substring(0, format.length - 14)
    let time = format.substring(format.length - 14, format.length-8)
    let day = date.substring(date.length-2, date.length)
    let month = date.substring(date.length-5, date.length-3)
    let year = date.substring(0, 4)
    return day + '/' + month + '/' + year + ' ' + time
}

export default formatDate