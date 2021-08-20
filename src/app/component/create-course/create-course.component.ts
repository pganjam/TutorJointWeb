import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, AbstractControl } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { CoursePayload, ModulePayload, FileUplodVM } from "../../model/course-payload";
import { Category } from "../../model/category-payload";
import { AddCourseService } from "../../service/add-course.service";
import { CategoryService } from "../../service/category.service";

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})


export class CreateCourseComponent {

  categoryList = [];
  categoryList$: Observable<Array<Category>> | undefined;
  

  editor = ClassicEditor;

  courseOverview: FormGroup;
  courseGoals: FormGroup;
  courseCurriculum: FormGroup;
  
  coursePayload: CoursePayload;
  imageSrc = '';
  constructor(private _formBuilder: FormBuilder, 
    private courseService: AddCourseService, 
    private categoryService: CategoryService, 
    private router: Router) {

    this.initCategories();
    
    this.courseOverview = this._formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      description: [''],
      file: ['', Validators.required],
      fileSource: ['', Validators.required],
    });
    this.courseGoals = this._formBuilder.group({
      goals: this._formBuilder.array([this.initGoal()])
    });
    this.courseCurriculum = this._formBuilder.group({
      modules: this._formBuilder.array([this.initModule()])
    });
    this.coursePayload = {
      id: '',
      description: '',
      category: '',
      title: '',
      goals: [],
      modules: [],
      avatar: new FileUplodVM(),
      tutor_id: ''
    }
  }

  //Goal
  initCategories() {
      this.categoryService.getCategories().subscribe((data: any) => {
      this.categoryList = data;
    });
  }
  getCategories():string[] {
    var categories:string[] = [];
    this.categoryList.forEach(category => {
      categories.push(category['description'])
    });

    return categories;
  }

  //Goal
  initGoal(): FormGroup {
    return this._formBuilder.group({
      isEditable: [true],
      description: ['', Validators.required]
    });
  }
  get goalArray() {
    return <FormArray>this.courseGoals.get('goals');
  }
  addGoal() {
    this.goalArray.push(this.initGoal());
  }
  removeGoal(index: number) {
    this.goalArray.removeAt(index);
  }
  editGoal(group: AbstractControl) {
    group.get('isEditable')?.setValue(true);
  }
  doneGoal(group: AbstractControl) {
    group.get('isEditable')?.setValue(false);
  }

  //Module
  initModule(): FormGroup {
    return this._formBuilder.group({
      isEditable: [true],
      description: ['', Validators.required],
      lessons: this._formBuilder.array([])
    });
  }
  get moduleArray() {
    return <FormArray>this.courseCurriculum.get('modules');
  }
  addModule(): void {
    this.moduleArray.push(this.initModule());
  }
  removeModule(index: number): void {
    this.moduleArray.removeAt(index);
  }
  editModule(group: AbstractControl) {
    group.get('isEditable')?.setValue(true);
  }
  doneModule(group: AbstractControl) {
    group.get('isEditable')?.setValue(false);
  }

  //Lesson
  initLesson(): FormGroup {
    return this._formBuilder.group({
      isEditable: [true],
      description: ['', Validators.required]
    });
  }
  getLessonArray(index: number) {
    return (<FormArray>((<FormGroup>this.moduleArray.controls[index]).controls.lessons));
  }
  addLesson(index: number) {
    (<FormArray>(<FormGroup>this.moduleArray.controls[index]).controls.lessons).push(this.initLesson());
  }


  //Course Image
  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.courseOverview.patchValue({
          fileSource: reader.result
        });
      };
      
      reader.onerror = function (error) {
        console.log('Error: ', error);
      };
    }
  }

  submit() {
    debugger;
    this.coursePayload.title = this.courseOverview.get('title')?.value;
    this.coursePayload.description = this.courseOverview.get('description')?.value;
    this.coursePayload.category = this.courseOverview.get('category')?.value;

    var fileUplodVM: FileUplodVM={
      name: '',
      type: '',
      base64String: this.imageSrc.toString()
    }
    this.coursePayload.avatar = fileUplodVM;
    this.coursePayload.goals = [];

    let goals = this.courseGoals.get('goals') as FormArray;
    goals.controls.forEach(goal => {
      this.coursePayload.goals?.push(goal.get('description')?.value);
    });
    this.coursePayload.modules = [];

    let modules = this.courseCurriculum.get('modules') as FormArray;
    modules.controls.forEach(module => {
      let lessons = module.get('lessons') as FormArray;
      let varLessons: string[] = [];
      lessons.controls.forEach(lesson => {
        varLessons.push(lesson.get('description')?.value);
      });
      this.coursePayload.modules?.push(
        {
          description: module.get('description')?.value,
          lessons: varLessons
        });
    });

    this.courseService.addCourse(this.coursePayload).subscribe(data => {
      this.router.navigateByUrl('/courses');
    }, error => {
      console.log('Failure Response');
    })
  }
}
