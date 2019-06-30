import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColorsComponent } from './colors.component';
import { TypographyComponent } from './typography.component';
import { SchoolComponent } from './school.component';
import { TutorComponent } from './tutor/tutor.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'school'
    },
    children: [
      {
        path: '',
        redirectTo: 'colors'
      },
      {
        path: 'message',
        component: ColorsComponent,
        data: {
          title: 'Colors'
        }
      },
      {
        path: 'typography',
        component: SchoolComponent,
        data: {
          title: 'Typography'
        }
      },
      {
        path: 'applictions',
        component: SchoolComponent,
        data: {
          title: 'school'
        }
      },
      {
        path: 'tutor',
        component: TutorComponent,
        data: {
          title: 'tutor'
        }
      },
      {
        path: 'detailMessage/:parentId',
        component: MessageDetailComponent,
        data: {
          title: 'message'
        }
      }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThemeRoutingModule {}
