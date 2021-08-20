import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { 
  HttpClientModule, 
  HTTP_INTERCEPTORS 
} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { MaterialDualListboxModule } from 'mea-material-dual-listbox';

import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './component/register/register.component';
import { RegisterSuccessComponent } from './component/register-success/register-success.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { CoursesComponent } from './component/courses/courses.component';
import { CourseComponent } from './component/course/course.component';
import { InputStarsComponent } from './component/input-stars/input-stars.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { PostComponent } from './component/post/post.component';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { RegisterTutorComponent } from './component/register-tutor/register-tutor.component';
import { TutorsComponent } from './component/tutors/tutors.component';
import { TutorComponent } from './component/tutor/tutor.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { CartComponent } from './component/cart/cart.component';
import { FooterComponent } from './component/footer/footer.component';
import { RegisterStudentComponent } from './component/register-student/register-student.component';
import { PostsComponent } from './component/posts/posts.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { StudentPageComponent } from './component/student-page/student-page.component';
import { VideoCallComponent } from './component/video-call/video-call.component';
import { TutorPageComponent } from './component/tutor-page/tutor-page.component';
import { ClassroomComponent } from './component/classroom/classroom.component';
import { AnnouncementsComponent } from './component/announcements/announcements.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { DiscussionsComponent } from './component/discussions/discussions.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { OverviewComponent } from './component/overview/overview.component';

import { MyCoursesComponent } from './component/my-courses/my-courses.component';
import { CourseFlierComponent } from './component/course-flier/course-flier.component';
import { TutorFlierComponent } from './component/tutor-flier/tutor-flier.component';
import { ContactComponent } from './component/contact/contact.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { BannerComponent } from './component/banner/banner.component';
import { ServicesComponent } from './component/services/services.component';
import { CategoryComponent } from './component/category/category.component';
import { FreeCoursesComponent } from './component/free-courses/free-courses.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';
import { AccordionComponent } from './component/accordion/accordion.component';
import { StoreComponent } from './component/store/store.component';
import { PartnerComponent } from './component/partner/partner.component';
import { PopularCoursesComponent } from './component/popular-courses/popular-courses.component';
import { NewAnnouncementModalComponent } from './component/announcements/new-announcement-modal/new-announcement-modal.component';
import { EventsComponent } from './component/events/events.component';
import { NewDiscussionModalComponent } from './component/discussions/new-discussion-modal/new-discussion-modal.component';
import { DragDropDirective } from './component/resources/drag-drop.directive';
import { BreadcrumbsComponent } from './component/breadcrumbs/breadcrumbs.component';
import { ErrorComponent } from './component/error/error.component';
import { AvailabilityComponent } from './component/availability/availability.component';
import { CategorySelectionComponent } from './component/category-selection/category-selection.component';
import { PickTeachingCategoriesComponent } from './component/pick-teaching-categories/pick-teaching-categories.component';
import { PickOfficeHoursComponent } from './component/pick-office-hours/pick-office-hours.component';
import { WhatwedoComponent } from './component/whatwedo/whatwedo.component';

declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>;
    providers?: Provider[];
  }
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterSuccessComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    CoursesComponent,
    CourseComponent,
    InputStarsComponent,
    AddPostComponent,
    PostComponent,
    CreateCourseComponent,
    RegisterTutorComponent,
    TutorsComponent,
    TutorComponent,
    CheckoutComponent,
    CartComponent,
    FooterComponent,
    RegisterStudentComponent,
    PostsComponent,
    StudentPageComponent,
    VideoCallComponent,
    TutorPageComponent,
    ClassroomComponent,
    AnnouncementsComponent,
    ResourcesComponent,
    DiscussionsComponent,
    ScheduleComponent,
    OverviewComponent,
    MyCoursesComponent,
    CourseFlierComponent,
    TutorFlierComponent,
    ContactComponent,
    RegistrationComponent,
    AboutUsComponent,
    BannerComponent,
    ServicesComponent,
    CategoryComponent,
    FreeCoursesComponent,
    TestimonialsComponent,
    AccordionComponent,
    StoreComponent,
    PartnerComponent,
    PopularCoursesComponent,
    NewAnnouncementModalComponent,
    EventsComponent,
    NewDiscussionModalComponent,
    DragDropDirective,
    BreadcrumbsComponent,
    ErrorComponent,
    AvailabilityComponent,
    CategorySelectionComponent,
    PickTeachingCategoriesComponent,
    PickOfficeHoursComponent,
    WhatwedoComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    CarouselModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatSelectModule,
    MatDividerModule, 
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MaterialDualListboxModule,
    MatGridListModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CKEditorModule,
    CommonModule,
    FormsModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    })
  ],
  providers: [ 
    DatePipe,       
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    NewAnnouncementModalComponent,
    NewDiscussionModalComponent
  ]
})
export class AppModule { }

