import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeightService {

  constructor() { }
  private headerAndFooterHeightOfDetailsConversationSubject = new BehaviorSubject<number>(0);
  private headerHeightSubject = new BehaviorSubject<number>(0);
  private footerHeightSubject = new BehaviorSubject<number>(0);

  headerAndFooterHeightOfDetailsConversation$ = this.headerAndFooterHeightOfDetailsConversationSubject.asObservable();
  headerHeight$ = this.headerHeightSubject.asObservable();
  footerHeight$ = this.footerHeightSubject.asObservable();

  setHeaderHeightSubject(height: number) {
    this.headerHeightSubject.next(height)
  }

  setFooterHeightSubject(height: number) {
    this.footerHeightSubject.next(height)
  }

  setheaderAndFooterHeightOfDetailsConversationSubject(headerHeight: number,footerHeight: number) {
    this.headerAndFooterHeightOfDetailsConversationSubject.next(headerHeight+footerHeight)
  }
}
