import {Component, OnInit} from '@angular/core';
import {FlickrService} from "./flickr.service";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";
import {concatMap, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    search = new FormControl();

    pictures$: Observable<any> = this.search.valueChanges
        .pipe(
            debounceTime(500),
            distinctUntilChanged(),
            concatMap(query => this.flick.getPictures$(query)),
        );

    constructor(public flick: FlickrService) {

    }


}
