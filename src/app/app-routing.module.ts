import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './component/register/register.component';
import { RegisterSuccessComponent } from './component/register-success/register-success.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CoursesComponent } from './component/courses/courses.component';
import { CourseComponent } from './component/course/course.component';
import { AddPostComponent } from './component/add-post/add-post.component';
import { PostComponent } from './component/post/post.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CreateCourseComponent } from './component/create-course/create-course.component';
import { RegisterTutorComponent } from './component/register-tutor/register-tutor.component';
import { TutorsComponent } from './component/tutors/tutors.component';
import { TutorComponent } from './component/tutor/tutor.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { RegisterStudentComponent } from './component/register-student/register-student.component';
import { PostsComponent } from './component/posts/posts.component';
import { StudentPageComponent } from './component/student-page/student-page.component';
import { VideoCallComponent } from './component/video-call/video-call.component';
import { ScheduleComponent } from './component/schedule/schedule.component';
import { ResourcesComponent } from './component/resources/resources.component';
import { AnnouncementsComponent } from './component/announcements/announcements.component';
import { DiscussionsComponent } from './component/discussions/discussions.component';
import { TutorPageComponent } from './component/tutor-page/tutor-page.component';
import { OverviewComponent } from './component/overview/overview.component';
import { ClassroomComponent } from './component/classroom/classroom.component';
import { Role } from './model/role';
import { MyCoursesComponent } from './component/my-courses/my-courses.component';
import { CourseFlierComponent } from './component/course-flier/course-flier.component';
import { TutorFlierComponent } from './component/tutor-flier/tutor-flier.component';
import { ContactComponent } from './component/contact/contact.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { BannerComponent } from './component/banner/banner.component';
import { ServicesComponent } from './component/services/services.component';
import { CategoryComponent } from './component/category/category.component';
import { PopularCoursesComponent } from './component/popular-courses/popular-courses.component';
import { FreeCoursesComponent } from './component/free-courses/free-courses.component';
import { TestimonialsComponent } from './component/testimonials/testimonials.component';
import { AccordionComponent } from './component/accordion/accordion.component';
import { StoreComponent } from './component/store/store.component';
import { PartnerComponent } from './component/partner/partner.component';
import { EventsComponent } from './component/events/events.component';
import { ErrorComponent } from './component/error/error.component';
import { AvailabilityComponent } from './component/availability/availability.component';
import { CategorySelectionComponent } from './component/category-selection/category-selection.component';
import { PickOfficeHoursComponent } from './component/pick-office-hours/pick-office-hours.component';
import { PickTeachingCategoriesComponent } from './component/pick-teaching-categories/pick-teaching-categories.component';


const routes: Routes = [
  {
    path: 'officehours',
    component: PickOfficeHoursComponent,
  },
  {
    path: 'categories',
    component: PickTeachingCategoriesComponent,
  },
  {
    path: 'category-selection',
    component: CategorySelectionComponent,
  },
  {
    path: 'availability/:id',
    component: AvailabilityComponent,
  },
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'banner',
    component: BannerComponent,
  },
  {
    path: 'services',
    component: ServicesComponent,
  },
  {
    path: 'category',
    component: CategoryComponent,
  },
  {
    path: 'popular-courses',
    component: PopularCoursesComponent,
  },
  {
    path: 'free-courses',
    component: FreeCoursesComponent,
  },
  {
    path: 'testimonials',
    component: TestimonialsComponent,
  },
  {
    path: 'accordion',
    component: AccordionComponent,
  },
  {
    path: 'store',
    component: StoreComponent,
  },
  {
    path: 'partner',
    component: PartnerComponent,
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'courses',
    component: CoursesComponent
  },
  {
    path: 'courses/:id',
    component: CourseComponent
  },
  {
    path: 'create-course',
    component: CreateCourseComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.TUTOR] }
  },
  {
    path: 'posts',
    component: PostsComponent
  },
  {
    path: 'post/:id',
    component: PostComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.TUTOR] }
  },
  {
    path: 'create-post',
    component: AddPostComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.TUTOR] }
  },
  {
    path: 'tutors',
    component: TutorsComponent
  },
  {
    path: 'tutors/:id',
    component: TutorComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'register-tutor',
    component: RegisterTutorComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.GUEST, Role.STUDENT] }
  },
  {
    path: 'register-student',
    component: RegisterStudentComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.GUEST, Role.TUTOR] }
  },
  {
    path: 'cart',
    component: CheckoutComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.STUDENT] }
  },
  {
    path: 'register-success',
    component: RegisterSuccessComponent
  },
  {
    path: 'tutor-page/:id',
    component: TutorPageComponent, 
    children: [
      { path: 'tutors', component: TutorFlierComponent, outlet: 'content-view' },
      { path: 'overview', component: OverviewComponent, outlet: 'content-view' },
      { path: 'events', component: EventsComponent, outlet: 'content-view' },
      { path: 'resources', component: ResourcesComponent, outlet: 'content-view' },
      { path: 'announcements', component: AnnouncementsComponent, outlet: 'content-view' },
      { path: 'discussions', component: DiscussionsComponent, outlet: 'content-view' },
      { path: 'my-courses', component: MyCoursesComponent, outlet: 'content-view' }
    ] 
  },
  {
    path: 'classroom/:id',
    component: ClassroomComponent, 
    children: [
      { path: 'courses', component: CourseFlierComponent, outlet: 'content-view' },
      { path: 'events', component: EventsComponent, outlet: 'content-view' },
      { path: 'resources', component: ResourcesComponent, outlet: 'content-view' },
      { path: 'announcements', component: AnnouncementsComponent, outlet: 'content-view' },
      { path: 'discussions', component: DiscussionsComponent, outlet: 'content-view' },
      { path: 'video-call', component: VideoCallComponent, outlet: 'content-view' }
    ] 
  },
  {
    path: 'student-page/:id',
    component: StudentPageComponent,
    children: [
      { path: 'overview', component: OverviewComponent, outlet: 'content-view' },
      { path: 'events', component: EventsComponent, outlet: 'content-view' },
      { path: 'resources', component: ResourcesComponent, outlet: 'content-view' },
      { path: 'announcements', component: AnnouncementsComponent, outlet: 'content-view' },
      { path: 'my-courses', component: MyCoursesComponent, outlet: 'content-view' },
      { path: 'discussions', component: DiscussionsComponent, outlet: 'content-view' }
    ],
    canActivate: [AuthGuard],
    data: { roles: [Role.GUEST, Role.STUDENT] }
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
