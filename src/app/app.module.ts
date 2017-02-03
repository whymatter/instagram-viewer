import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Router } from '@angular/router';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { Authorisation } from './authorization.component';
import { RedirectLanding } from './redirect-landing.component';
import { Feed } from './feed.component';
import { FeedItem } from './feed-item.component';

import { DefaultInstagramCredentials } from './default-instagram-credentials';
import { InstagramUrlGenerator } from './instagram-url-generator';
import { InstagramCredentials } from './instagram-credentials';
import { RedirectResolver } from './redirect-resolver';
import { UserFeedService } from './user-feed.service';
import { TagFeedService } from './tag-feed.service';
import { InstagramApiService } from './instagram-api.service';
import { UserSelfProviderService } from './user-self-provider.service';
import { FeedProviderService } from './feed-provider.service';
import { Search } from './search/search.component';
import { UserSearchService } from './search/user-search.service';
import { TagSearchService } from './search/tag-search.service';
import { Modal } from './modal.component';
import { ModalService } from './modal.service';
import { ModalSingle } from './modal-single.component';
import { FeedItemDetail } from './feed-item-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    Authorisation,
    RedirectLanding,
    Feed,
    FeedItem,
    Search,
    Modal,
    ModalSingle,
    FeedItemDetail
  ],
  entryComponents: [FeedItemDetail],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      {
        path: 'auth/redirect',
        component: RedirectLanding,
      },
      {
        path: 'auth/login',
        component: Authorisation,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'feed/user/self'
      },
      {
        path: 'feed/:type/:id',
        component: Feed
      },
      {
        path: 'redirectInstagram',
        component: Authorisation,
        resolve: {
          url: 'instagramredirect'
        }
      }
    ])
  ],
  providers: [
    UserFeedService,
    TagFeedService,
    InstagramUrlGenerator,
    UserSearchService,
    TagSearchService,
    InstagramApiService,
    UserSelfProviderService,
    ModalService,
    {
      provide: InstagramCredentials,
      useClass: DefaultInstagramCredentials
    },
    {
      provide: 'instagramredirect',
      useClass: RedirectResolver
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
