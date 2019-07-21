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
export class AppComponent implements OnInit {

    search = new FormControl();
    pictures$: Observable<any>;

    constructor(public flick: FlickrService) {

    }

    ngOnInit() {
        this.pictures$ = this.search.valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                concatMap(query => this.flick.getPictures$(query)),
                tap(r => console.warn(r))
            )
    }


}
