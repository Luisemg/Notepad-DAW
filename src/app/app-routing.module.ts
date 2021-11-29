import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NotesComponent } from './notes/notes.component';
import { AboutComponent } from './about/about.component';
import { CameraComponent } from './camera/camera.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path:'notes',
    component: NotesComponent
  },
  {
    path:'camera',
    component: CameraComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
