export interface ResultApi {
    photos: {
        photo: {
            farm, server, id, secret, title
        }[]
    }
}

export interface FlickrPhoto {
    title: string,
    url: string
}