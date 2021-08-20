import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '@app/model';
import { AuthenticationService, CategoryService, TutorService } from '@app/service';

@Component({
  selector: 'app-pick-teaching-categories',
  templateUrl: './pick-teaching-categories.component.html',
  styleUrls: ['./pick-teaching-categories.component.css']
})
export class PickTeachingCategoriesComponent implements OnInit {

  public disableSubmit: boolean = true;

  categoriesForm: FormGroup | undefined;

  public categories: Array<Category> = [];

  constructor(private categoryService: CategoryService,
    private tutorService: TutorService,
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
    this.categoriesForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.tutorService.getCategories(this.authenticationService.userId).subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  selectSubCategory(cat_idx: number, sub_cat_idx: number) {
    this.disableSubmit = false;
    if (this.categories[cat_idx].subCategories[sub_cat_idx].flag) {
      this.categories[cat_idx].subCategories[sub_cat_idx].flag = false;
    } else {
      this.categories[cat_idx].subCategories[sub_cat_idx].flag = true;
    }

    debugger;
    let flag: boolean = true;

    this.categories[cat_idx].subCategories.forEach(element => {
      flag = flag && element.flag;
    });

    if (flag)
      this.categories[cat_idx].flag = true;
    else
      this.categories[cat_idx].flag = false;
  }

  selectCategory(idx: number) {
    this.disableSubmit = false;
    if (this.categories[idx].flag) {
      this.categories[idx].flag = false;
    } else {
      this.categories[idx].flag = true;
    }
  }

  onSubmit() {
    this.categoryService.updateCategories(this.categories, this.authenticationService.userId).subscribe((data: any) => {
      this.router.navigateByUrl('/categories');
      this.disableSubmit = true;
    });
  }
}
