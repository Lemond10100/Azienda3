import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ControlloLetteraComponent } from './controllo-lettera/controllo-lettera.component';
import { NameEditorComponent } from './name-editor/name-editor.component';
import { ProfileEditorComponent } from './profile-editor/profile-editor.component';



const routes: Routes = [
  { path: 'progetto', component: ControlloLetteraComponent },
  { path: 'esempio1', component: NameEditorComponent },
  { path: 'esempio2', component: ProfileEditorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
