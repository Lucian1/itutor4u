  // Angular
  import { CommonModule } from '@angular/common';
  import { NgModule } from '@angular/core';

  import { ColorsComponent } from './colors.component';
  import { TypographyComponent } from './typography.component';
  import { SchoolComponent } from './school.component';
  import { TutorComponent } from './tutor/tutor.component';
  import { MessageDetailComponent } from './message-detail/message-detail.component';
  // Theme Routing
  import { ThemeRoutingModule } from './theme-routing.module';
  import { HttpClientModule, HttpClient } from '@angular/common/http';



  @NgModule({
    imports: [
      CommonModule,
      ThemeRoutingModule,
      HttpClientModule,
      
      
    ],
    declarations: [
      ColorsComponent,
      TypographyComponent,
      SchoolComponent,
      TutorComponent,
      MessageDetailComponent,
      
      
    ]
  })
  export class ThemeModule { }
