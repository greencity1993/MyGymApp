import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainersComponent } from './trainers/trainers.component';
import { TrainerComponent } from './trainer/trainer.component';


const routes: Routes = [
  { path: '', component: TrainersComponent },
  { path: 'trainer/:id', component: TrainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
