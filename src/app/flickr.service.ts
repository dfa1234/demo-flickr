import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {FlickrPhoto, ResultApi} from "./flickr.model";


@Injectable({
    providedIn: 'root'
})
export class FlickrService {

    private API_KEY = `bac9f1ccfd854f27894fd47c4f01b1e8`;

    constructor(private http: HttpClient) {
    }

    getPictures$(query: string): Observable<FlickrPhoto[]> {

        if (!query) {
            return of([])
        }

        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${this.API_KEY}&safe_search=1&format=json&nojsoncallback=1&content_type=1&is_getty=1&tags=${query}`;

        return this.http.get<ResultApi>(url).pipe(
            map(results => {

                if (!results || !results.photos || !results.photos.photo || !results.photos.photo) {
                    return []
                }

                return results.photos.photo.map(photo => {
                    return {
                        url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
                        title: photo.title
                    }
                })

            })
        );
    }

}
