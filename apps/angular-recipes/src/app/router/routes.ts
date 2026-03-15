import { Routes } from '@angular/router'

import { HomePageComponent } from '@/app/pages/home-page'
import { RecipePageComponent } from '@/app/pages/recipe-page'

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Frontend Recipes',
  },
  {
    path: 'recipes/:slug',
    component: RecipePageComponent,
    title: 'Recipe',
  },
]
