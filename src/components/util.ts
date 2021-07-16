// import React from React;

export const toTitleCase = (text: string) => {
    return text.replace(/\w\S*/g, (t) => {
        return t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()
    })
}

// NB this is a variation
export const isEmpty = (obj: any): boolean => Object.entries(obj).length === 0

// Original version:
// export const isEmpty = (obj: any): boolean => {
//     for (const key in obj) {
//         if (obj.hasOwnProperty(key)) return false
//     }
//     return true
// }

// export const target_new_window = {
//     link: (props: any) => {
//         return `<a href=${props.href} target="_blank" rel="nofollow noreferrer noopener">${props.children}</a>`
//     }
// }