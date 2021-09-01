import {Component, OnInit} from '@angular/core';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'App';
  private buildVersion = environment.buildVersion;
  private buildDate = environment.buildDate;
  private buildNumber = environment.buildNumber;

  constructor() {
  }

  ngOnInit() {
  }

  isIOs() {
    return !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
  }
  openChat() {
    console.log('open chat');
    if (this.isIOs()) {
      // tslint:disable-next-line:max-line-length
      // @ts-ignore
      window.location = 'https://business-messages-launcher.appspot.com?url=https%3A%2F%2Fbusiness.google.com%2Fmessage%3Fargs%3DCjkIAxIkOWU0YjAwMzYtMmMwYi00ZWJiLWFiNTgtNjczNTJmYmQ4ZTllGgpjYy1saXN0aW5nIgNHTU0SVAoSY2MtbGlzdGluZ19jb250ZXh0Ej4KOHR5cGUuZ29vZ2xlYXBpcy5jb20vY2hhdC5ib3QucGxhdGZvcm0uQnVzaW5lc3NIdWJDb250ZXh0EgJICA';

    } else {
      // tslint:disable-next-line:max-line-length
      // @ts-ignore
      window.location = 'https://business.google.com/initiateBusinessChat?args=CigIAxIkOWU0YjAwMzYtMmMwYi00ZWJiLWFiNTgtNjczNTJmYmQ4ZTllYgd3ZWJ2aWV3aiJodHRwOi8vYnVzaW5lc3NtZXNzYWdlcy5nb29nbGUuY29tckIIAxIkOWU0YjAwMzYtMmMwYi00ZWJiLWFiNTgtNjczNTJmYmQ4ZTllGgpjYy1saXN0aW5nIgw5Njg2MTA1NTQ1NDCaAYsBChJjYy1saXN0aW5nX2NvbnRleHQSdQo4dHlwZS5nb29nbGVhcGlzLmNvbS9jaGF0LmJvdC5wbGF0Zm9ybS5CdXNpbmVzc0h1YkNvbnRleHQSOUgIWiQKGG92ZXJyaWRlX2NybV9lbnRyeV9wb2ludBIIVEVTVF9VUkxaDwoHaXNfdGVzdBIEdHJ1ZQ&hl=en';
    }
  }
}
