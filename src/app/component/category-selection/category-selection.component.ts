import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_CALENDAR_RANGE_STRATEGY_PROVIDER_FACTORY } from '@angular/material/datepicker/date-range-selection-strategy';
import { Category } from '@app/model';
import { CategoryService } from '@app/service';

@Component({
  selector: 'app-category-selection',
  templateUrl: './category-selection.component.html',
  styleUrls: ['./category-selection.component.css']
})
export class CategorySelectionComponent implements OnInit {

  categoriesForm: FormGroup | undefined;

  public categories: Array<Category> = [];

  constructor(private categoryService: CategoryService,
    private fb: FormBuilder) {
    this.categoriesForm = this.fb.group({});
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
    });
  }

  selectSubCategory(cat_idx: number, sub_cat_idx: number) {
    if(!this.categories[cat_idx].flag) {
      if(this.categories[cat_idx].subCategories[sub_cat_idx].flag) {
        this.categories[cat_idx].subCategories[sub_cat_idx].flag = false;
      } else {
        this.categories[cat_idx].subCategories[sub_cat_idx].flag = true;
      }
    }
  }

  selectCategory(idx: number) {
    if (this.categories[idx].flag) {
      this.categories[idx].flag = false;
    } else {
      this.categories[idx].flag = true;
    }
  }

  onSubmit() {
    console.log(this.categories);
  }
}
