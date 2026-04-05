# Angular Fundamentals Interview Questions

![Angular Fundamentals Interview Questions](../../assets/angular-architecture.svg)

This page stays at the Angular fundamentals level and focuses on the building blocks of everyday Angular applications.

## 1. Angular framework overview

### 1. What is the role of Angular framework overview in Angular fundamentals?

**Answer:**

Angular is a TypeScript-based framework for building scalable, structured single-page applications with built-in tooling for routing, HTTP, forms, and testing. It provides a complete ecosystem for frontend development with TypeScript as first-class language, dependency injection, and two-way data binding.

**Code Example:**

```typescript
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-blog-dashboard",
  template: `
    <header>
      <h1>{{ appTitle }} - Angular Framework</h1>
      <p>Built with TypeScript, Components, Services, and RxJS</p>
    </header>
    <main>
      <section class="features">
        <h2>Angular Provides:</h2>
        <ul>
          <li>Structured Components Architecture</li>
          <li>Dependency Injection</li>
          <li>Built-in Router for SPA Navigation</li>
          <li>Reactive Forms & Template-driven Forms</li>
          <li>HttpClientModule for API calls</li>
          <li>RxJS for Reactive Programming</li>
        </ul>
      </section>
    </main>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class BlogDashboardComponent {
  appTitle = "Professional Blog Dashboard";
}
```

---

### 2. Why is Angular framework important as a foundation?

**Answer:**

Angular's structured approach enforces best practices, scalability, and maintainability. It provides clear separation of concerns with components, services, and dependency injection, making large teams productive and code easier to test and refactor.

**Code Example:**

```typescript
import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CommonModule } from "@angular/common";

// Service: Handles business logic
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get("/api/users");
  }
}

// Component: Handles presentation
@Component({
  selector: "app-user-list",
  template: `
    <div class="users">
      <h2>User Management System</h2>
      <ul>
        <li *ngFor="let user of users">{{ user.name }} - {{ user.email }}</li>
      </ul>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
}
```

---

### 3. When should teams adopt Angular?

**Answer:**

Use Angular for large enterprise applications requiring TypeScript, structured architecture, comprehensive tooling, and team collaboration. It's ideal when you need built-in routing, forms handling, and integrated testing frameworks.

**Code Example:**

```typescript
// Enterprise app structure with Angular
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

// Routing for multiple features
export const routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "products", component: ProductListComponent },
  { path: "settings", component: SettingsComponent },
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
];
```

---

### 4. How is Angular applied in practice?

**Answer:**

Create TypeScript components with decorators (@Component), inject dependencies, use services for logic, bind data in templates, and leverage Angular CLI for scaffolding. Structure the app with routing, feature modules, and lazy loading for scalability.

**Code Example:**

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { CommonModule } from "@angular/common";

// Practical Angular app component
@Component({
  selector: "app-todo-app",
  template: `
    <div class="container">
      <h1>Todo Application</h1>
      <form [formGroup]="todoForm" (ngSubmit)="addTodo()">
        <input formControlName="title" placeholder="Add new todo" />
        <button type="submit">Add</button>
      </form>
      <ul>
        <li *ngFor="let todo of todos">{{ todo.title }}</li>
      </ul>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class TodoAppComponent implements OnInit, OnDestroy {
  todoForm: FormGroup;
  todos: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({ title: ["", Validators.required] });
  }

  ngOnInit() {
    this.todoForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((val) => console.log(val));
  }

  addTodo() {
    if (this.todoForm.valid) {
      this.todos.push(this.todoForm.value);
      this.todoForm.reset();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

### 5. What strengths does Angular bring?

**Answer:**

End-to-end framework, TypeScript support, powerful CLI, strong testing tools (TestBed, Karma, Jasmine), clear separation of concerns, excellent documentation, strong community, and enterprise-backed by Google.

**Code Example:**

```typescript
// Testing Angular components - strength of framework
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MyComponent } from "./my.component";

describe("MyComponent", () => {
  let component: MyComponent;
  let fixture: ComponentFixture<MyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should render title", () => {
    const title = fixture.nativeElement.querySelector("h1");
    expect(title.textContent).toContain("My Title");
  });
});
```

---

### 6. What tradeoffs come with Angular?

**Answer:**

Larger bundle size than minimal frameworks, steeper learning curve for beginners, boilerplate code for simple apps, slower initial development compared to smaller libraries, and more opinionated structure.

**Code Example:**

```typescript
// ❌ WRONG: Over-engineering a simple component with Angular
@Component({
  selector: "app-simple-text",
  template: `<p>{{ text }}</p>`,
  standalone: true,
})
export class SimpleTextComponent {
  text = "Hello"; // Overkill for just displaying text
}

// ✅ CORRECT: Use React or Vue for simple UI, or vanilla JS
const simple = document.querySelector("p");
simple!.textContent = "Hello"; // Much simpler
```

---

### 7. How does Angular framework differ from other frameworks?

**Answer:**

React is view-only (use Redux/Context for state), Vue is lighter and faster to start, Svelte compiles away the framework. Angular includes everything: routing, forms, HTTP, DI, testing, all in one package with opinionated structure.

**Code Example:**

```typescript
// Angular: Full framework with routing, DI, forms
import { Routes } from "@angular/router";

export const appRoutes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "stats", component: StatsComponent },
      { path: "profile", component: ProfileComponent },
    ],
  },
];

// React: Requires separate libraries
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// Redux for state, React Query for HTTP, etc.
```

---

### 8. What is a real-world Angular application example?

**Answer:**

Enterprise SPA with authentication, dashboard, multiple feature modules with lazy loading, backend API integration, complex forms with validation, real-time data updates via WebSockets, and user role-based access control.

**Code Example:**

```typescript
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

// Real-world: Admin dashboard with features
@Component({
  selector: "app-admin-dashboard",
  template: `
    <nav class="sidebar">
      <a routerLink="/dashboard/users" routerLinkActive="active">Users</a>
      <a routerLink="/dashboard/reports" routerLinkActive="active">Reports</a>
      <a routerLink="/dashboard/settings" routerLinkActive="active">Settings</a>
    </nav>
    <main class="content">
      <router-outlet></router-outlet>
    </main>
  `,
  standalone: true,
})
export class AdminDashboardComponent implements OnInit {
  users$: Observable<any[]>;

  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.users$ = this.userService.getAdminUsers();
  }
}
```

---

### 9. What are best practices for Angular apps?

**Answer:**

Use standalone components, lazy loading for feature modules, OnPush change detection, implement proper error handling, follow SOLID principles, use environments for configuration, implement HTTP interceptors for centralized handling, and properly manage subscriptions.

**Code Example:**

```typescript
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";

// Best practice: Centralized HTTP error handling
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log("HTTP Error:", error);
        // Handle errors globally
        return throwError(() => error);
      }),
    );
  }
}

// Best practice: OnPush change detection for performance
@Component({
  selector: "app-optimized",
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<p>{{ data }}</p>`,
})
export class OptimizedComponent {
  @Input() data: string;
}
```

---

### 10. What common mistakes occur in Angular?

**Answer:**

Memory leaks from unsubscribed observables, slow change detection, ignoring async pipe causing manual subscriptions, mixing smart/dumb components improperly, not using TrackBy in \*ngFor, circular dependencies, and improper DI scopes.

**Code Example:**

```typescript
// ❌ WRONG: Memory leak - never unsubscribes
@Component({})
export class BadComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      console.log(users); // Never unsubscribes!
    });
  }
}

// ✅ CORRECT: Proper subscription management
@Component({})
export class GoodComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users) => console.log(users));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

### 11. How do you troubleshoot Angular issues?

**Answer:**

Use Angular DevTools, check console for errors, inspect component tree, use debugger for breakpoints, check network tab for API calls, verify dependency injection scopes, examine change detection cycles, and use logging with console.log or logging library.

**Code Example:**

```typescript
import { Component, OnInit } from "@angular/core";
import { ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-debug",
  template: `
    <div>
      <p>Debug Info: {{ debugInfo | json }}</p>
      <button (click)="logState()">Log State</button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugComponent {
  debugInfo = { status: "initialized", timestamp: new Date() };

  logState() {
    console.log("Current state:", this.debugInfo);
    console.log("View initialized");
  }
}
```

---

### 12. How does Angular connect all fundamentals together?

**Answer:**

Components (UI blocks) + Templates (HTML views) + Services (logic) + DI (dependency management) + Data Binding (connection) + Directives (behavior) + Routing (navigation) + Change Detection (updates) = Complete Application Framework.

**Code Example:**

```typescript
// Complete Angular ecosystem
import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

// Service: Business logic
@Injectable({ providedIn: "root" })
export class PostService {
  posts$ = new Subject();

  constructor(private http: HttpClient) {}

  loadPosts() {
    return this.http.get("/api/posts");
  }
}

// Component: UI + Template
@Component({
  selector: "app-blog",
  template: `
    <div class="blog">
      <h1>{{ title }}</h1>
      <post *ngFor="let post of posts$ | async" [post]="post"></post>
    </div>
  `,
})
export class BlogComponent {
  title = "My Blog";
  posts$ = this.postService.posts$;

  constructor(public postService: PostService) {
    this.postService.loadPosts().subscribe();
  }
}
```

---

## 2. Components

### 13. What is the role of Components in Angular?

**Answer:**

Components are reusable, encapsulated UI building blocks that combine HTML template, TypeScript class logic, and CSS styling. Each component manages its own state, handles user interactions, and communicates with other components through inputs, outputs, and services.

**Code Example:**

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-card',
  template: `
    <div class="card">
      <h3>{{ product.name }}</h3>
      <p>${{ product.price }}</p>
      <button (click)="onAddToCart()">Add to Cart</button>
    </div>
  `,
  styles: [`
    .card { border: 1px solid #ddd; padding: 20px; }
  `],
  standalone: true,
})
export class ProductCardComponent {
  @Input() product: any;
  @Output() addToCart = new EventEmitter<any>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}
```

---

### 14. Why are Components important in Angular?

**Answer:**

Components enable code reusability, encapsulation, clear interface contracts with @Input/@Output, testability, and modular architecture. They make large applications manageable by breaking UI into small, focused pieces.

**Code Example:**

```typescript
// Component hierarchy shows importance
@Component({
  selector: "app-shopping-cart",
  template: `
    <div class="cart">
      <app-product-card
        *ngFor="let item of items"
        [product]="item"
        (addToCart)="onAddItem($event)"
      >
      </app-product-card>
      <app-cart-summary [total]="cartTotal"></app-cart-summary>
    </div>
  `,
})
export class ShoppingCartComponent {
  items: any[] = [];
  cartTotal = 0;

  onAddItem(product: any) {
    this.items.push(product);
    this.cartTotal += product.price;
  }
}
```

---

### 15. When should you create Components?

**Answer:**

Create a component when you have a distinct UI piece with its own state and behavior, want to reuse a UI pattern, need an encapsulated scope, or want to separate concerns. Avoid single-use components for very simple HTML.

**Code Example:**

```typescript
// ✅ Good: Component for reusable modal dialog
@Component({
  selector: "app-modal",
  template: `
    <div class="modal-overlay" (click)="onClose()">
      <div class="modal-content">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();
  onClose() {
    this.close.emit();
  }
}

// Usage in multiple places
// <app-modal (close)="onModalClose()">
//   <p>Confirm action?</p>
// </app-modal>
```

---

### 16. How are Components applied in practice?

**Answer:**

Define @Component decorator with selector, template, styles, and imports. Create class with properties and methods. Use @Input for data down, @Output for events up. Inject services via constructor. Implement lifecycle hooks as needed.

**Code Example:**

```typescript
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-data-display",
  template: `
    <ul>
      <li *ngFor="let item of data">{{ item.name }}</li>
    </ul>
  `,
  standalone: true,
})
export class DataDisplayComponent implements OnInit, OnDestroy {
  data: any[] = [];
  private destroy$ = new Subject<void>();

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService
      .getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => (this.data = data));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

### 17. What are Component strengths?

**Answer:**

Encapsulation, reusability, clear public interface through @Input/@Output, easy testing in isolation, clear responsibility, composability into larger UIs, state management per component.

**Code Example:**

```typescript
// Component strength: Testable
import { ComponentFixture, TestBed } from "@angular/core/testing";

describe("ButtonComponent", () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent],
    }).compileComponents();
  });

  it("emits click event", () => {
    spyOn(component.clicked, "emit");
    component.onClick();
    expect(component.clicked.emit).toHaveBeenCalled();
  });
});
```

---

### 18. What Component tradeoffs exist?

**Answer:**

More boilerplate than simple HTML, component communication overhead, potential deep nesting, change detection performance with many components, prop drilling for deeply nested data.

**Code Example:**

```typescript
// ❌ WRONG: Too many nested components for simple UI
<app-layout>
  <app-header>
    <app-nav>
      <app-menu>
        <app-item>Link</app-item>
      </app-menu>
    </app-nav>
  </app-header>
</app-layout>

// ✅ CORRECT: Simple template when complexity isn't needed
<header>
  <nav>
    <a href="#home">Home</a>
    <a href="#about">About</a>
  </nav>
</header>
```

---

### 19. How do Components differ from Templates?

**Answer:**

Components are TypeScript classes with decorators and logic, Templates are HTML views with bindings. Components control behavior, lifecycle, and state; Templates handle presentation and user interaction event binding.

**Code Example:**

```typescript
// Component: Logic and state
export class CounterComponent {
  count = 0;

  increment() {
    this.count++;
  }
  decrement() {
    this.count--;
  }
}

// Template: Presentation of component's logic
// <div>
//   <p>Count: {{ count }}</p>
//   <button (click)="increment()">+</button>
//   <button (click)="decrement()">-</button>
// </div>
```

---

### 20. What is a real-world Component example?

**Answer:**

E-commerce product detail component with image carousel, price display with discounts, quantity selector, reviews section, inventory status, related products, all managing their own state and emitting purchase events.

**Code Example:**

```typescript
@Component({
  selector: "app-product-detail",
  template: `
    <div class="product">
      <app-image-carousel [images]="product.images"></app-image-carousel>
      <div class="details">
        <h1>{{ product.name }}</h1>
        <p class="price">{{ product.price | currency }}</p>
        <app-quantity-selector (quantitySelected)="selectedQty = $event">
        </app-quantity-selector>
        <button (click)="addToCart()">Add to Cart</button>
      </div>
      <app-reviews [productId]="product.id"></app-reviews>
    </div>
  `,
})
export class ProductDetailComponent implements OnInit {
  product: any;
  selectedQty = 1;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      // Load product by ID
    });
  }

  addToCart() {
    this.cartService.add(this.product, this.selectedQty);
  }
}
```

---

### 21. What are Component best practices?

**Answer:**

Keep components focused and single-responsibility. Use @Input/@Output for clear communication. Make components pure when possible. Properly manage subscriptions. Use OnPush change detection for optimization. Keep templates simple.

**Code Example:**

```typescript
// Best practice: Single responsibility, pure component
@Component({
  selector: "app-email-display",
  template: `<p>{{ email }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EmailDisplayComponent {
  @Input() email: string;
}

// Best practice: Composition with child components
@Component({
  selector: "app-user-profile",
  template: `
    <div class="profile">
      <app-avatar [url]="user.avatar"></app-avatar>
      <app-user-info [user]="user"></app-user-info>
      <app-email-display [email]="user.email"></app-email-display>
    </div>
  `,
})
export class UserProfileComponent {
  @Input() user: User;
}
```

---

### 22. What common Component mistakes happen?

**Answer:**

Not unsubscribing from observables, ignoring OnDestroy, creating component instead of using reusable logic, two-way binding abuse with [(ngModel)], not using async pipe, circular dependencies, mutating @Input objects.

**Code Example:**

```typescript
// ❌ WRONG: Memory leak from unmanaged subscriptions
@Component({})
export class BadComponent {
  constructor(private service: DataService) {
    this.service.getData().subscribe((data) => {
      // Never unsubscribes!
    });
  }
}

// ✅ CORRECT: Proper subscription management
@Component({})
export class GoodComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private service: DataService) {
    this.service
      .getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        /* ... */
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

### 23. How do you troubleshoot Component issues?

**Answer:**

Use Angular DevTools to inspect component tree, check @Input/@Output bindings, verify change detection, inspect console for errors, check if component is properly declared, verify selector matches usage, check nested component communication.

**Code Example:**

```typescript
// Component with debugging capabilities
@Component({
  selector: "app-debug-component",
  template: `
    <div>
      <p>{{ data }}</p>
      <button (click)="logDebugInfo()">Debug</button>
    </div>
  `,
})
export class DebugComponent {
  @Input() data: any;

  logDebugInfo() {
    console.log("Input data:", this.data);
    console.log("Component state:", { data: this.data });
  }
}
```

---

### 24. How do Components connect to Angular?

**Answer:**

Components are the core of Angular. They use templates for UI, services for logic, directives for behavior, dependency injection for dependencies, lifecycle hooks for control, and change detection for updating views.

**Code Example:**

```typescript
// Complete component ecosystem
@Component({
  selector: 'app-complete-example',
  template: `
    <div [appHighlight]="highlightColor">
      <p *ngIf="isVisible">{{ message }}</p>
      <input [(ngModel)]="inputValue" />
      <app-child
        [childData]="inputValue"
        (childEvent)="onChildEvent($event)">
      </app-child>
    </div>
  `,
})
export class CompleteExampleComponent implements OnInit, OnDestroy {
  @ViewChild('templateRef') templateRef: TemplateRef<any>;
  @ContentChild(SomeComponent) contentChild: SomeComponent;

  message = 'Hello Components!';
  highlightColor = 'yellow';
  isVisible = true;
  inputValue = '';

  constructor(private service: MyService) {}

  ngOnInit() {
    this.service.getData().pipe(takeUntil(this.destroy$)).subscribe(...);
  }

  onChildEvent(event: any) {
    console.log('Received from child:', event);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
```

---

## 3. Templates

### 25. What is the role of Templates in Angular?

**Answer:**

Templates are HTML views with Angular bindings, directives, and expressions that define the UI for a component. Templates render component state dynamically and handle user interactions through event binding.

**Code Example:**

```typescript
import { Component, NgIf, NgFor, CommonModule } from "@angular/core";

@Component({
  selector: "app-todo-list",
  template: `
    <div class="todo">
      <input [(ngModel)]="newTodo" placeholder="Add todo" />
      <button (click)="addTodo()">Add</button>
      <ul>
        <li *ngFor="let item of todos">{{ item.name }}</li>
      </ul>
    </div>
  `,
  imports: [NgIf, NgFor, CommonModule],
})
export class TodoListComponent {
  todos: any[] = [];
  newTodo = "";

  addTodo() {
    this.todos.push({ name: this.newTodo });
    this.newTodo = "";
  }
}
```

---

### 26. Why are Templates important in Angular?

**Answer:**

Templates separate presentation logic from component class logic, enable declarative UI definition, support data binding and directives, and provide clear view structure. They make templates more readable and maintainable than programmatic DOM manipulation.

**Code Example:**

```typescript
// ✅ GOOD: Clear template structure
@Component({
  selector: "app-profile",
  template: `
    <div class="profile">
      <h1>{{ user.name }}</h1>
      <p>{{ user.email }}</p>
      <button (click)="onEdit()">Edit Profile</button>
      <p *ngIf="isEditing">
        <input [(ngModel)]="user.name" />
        <button (click)="onSave()">Save</button>
      </p>
    </div>
  `,
})
export class ProfileComponent {
  @Input() user: any;
  isEditing = false;

  onEdit() {
    this.isEditing = true;
  }
  onSave() {
    this.isEditing = false;
  }
}
```

---

### 27. When should you use Template syntax?

**Answer:**

Use templates for all Angular components. Keep templates focused on presentation, not business logic. Use data binding {{ }} for display, property binding [ ] for attributes, event binding ( ) for user interactions, and two-way binding [( )] when needed.

**Code Example:**

```typescript
// Component with various template bindings
@Component({
  selector: "app-form",
  template: `
    <div class="form">
      <!-- Interpolation: {{ }} -->
      <p>User: {{ currentUser }}</p>

      <!-- Property binding: [ ] -->
      <img [src]="imageUrl" [alt]="imageName" />
      <button [disabled]="isLoading">Submit</button>

      <!-- Event binding: ( ) -->
      <input (keyup)="onKeyUp($event)" />
      <button (click)="onSubmit()">Submit</button>

      <!-- Two-way binding: [( )] -->
      <input [(ngModel)]="formData.name" />
    </div>
  `,
})
export class FormComponent {
  currentUser = "John";
  imageUrl = "/images/user.jpg";
  imageName = "User avatar";
  isLoading = false;
  formData = { name: "" };

  onKeyUp(event: any) {
    /* ... */
  }
  onSubmit() {
    /* ... */
  }
}
```

---

### 28. How are Templates applied in practice?

**Answer:**

Define templates using inline template string, templateUrl, or ng-template. Use interpolation {{ }}, directives (*ngIf, *ngFor), binding syntax ([ ], ( ), [( )]), and template variables (#ref). Keep business logic in component class, presentation in template.

**Code Example:**

```typescript
import { Component, TemplateRef, ViewChild } from "@angular/core";

@Component({
  selector: "app-conditional-render",
  template: `
    <div>
      <!-- Using template variables and directives -->
      <ng-container
        *ngIf="showDetails; then detailsTemplate; else loadingTemplate"
      >
      </ng-container>

      <!-- Template references -->
      <ng-template #detailsTemplate>
        <div class="details">
          <p *ngFor="let item of items; let i = index">
            {{ i + 1 }}. {{ item }}
          </p>
        </div>
      </ng-template>

      <ng-template #loadingTemplate>
        <p>Loading...</p>
      </ng-template>
    </div>
  `,
})
export class ConditionalRenderComponent {
  showDetails = true;
  items = ["Item 1", "Item 2", "Item 3"];
}
```

---

### 29. What are Template strengths?

**Answer:**

Declarative syntax is easy to read, binding creates two-way connection between template and component, directives provide powerful DOM manipulation, templates are compiled for performance, support for event handling, and clear separation of concerns.

**Code Example:**

```typescript
// Template strength: Declarative and readable
@Component({
  selector: "app-dashboard",
  template: `
    <div class="dashboard">
      <h1>{{ title }}</h1>
      <div class="cards">
        <div *ngFor="let card of cards" [class.highlighted]="card.featured">
          <h3>{{ card.title }}</h3>
          <p>{{ card.description }}</p>
          <button (click)="selectCard(card)">Select</button>
        </div>
      </div>
      <app-details *ngIf="selectedCard" [card]="selectedCard"></app-details>
    </div>
  `,
})
export class DashboardComponent {
  title = "My Dashboard";
  cards = [
    { title: "Card 1", description: "Description 1", featured: true },
    { title: "Card 2", description: "Description 2", featured: false },
  ];
  selectedCard: any = null;

  selectCard(card: any) {
    this.selectedCard = card;
  }
}
```

---

### 30. What Template tradeoffs exist?

**Answer:**

Template syntax adds learning curve for beginners, complex templates become hard to maintain, performance issues with heavy binding, debugging template issues is harder, and templates cannot handle all logic (iterative code needs component logic).

**Code Example:**

```typescript
// ❌ WRONG: Too much logic in template
<div *ngFor="let user of users">
  <p *ngIf="user.age > 18 && user.status === 'active' && user.verified && user.plan !== 'free'">
    {{ user.name }}
  </p>
</div>

// ✅ CORRECT: Logic in component, template for display
@Component({
  template: `
    <div *ngFor="let user of eligibleUsers">
      <p>{{ user.name }}</p>
    </div>
  `,
})
export class UserListComponent {
  @Input() users: User[];

  get eligibleUsers() {
    return this.users.filter(u =>
      u.age > 18 && u.status === 'active' && u.verified && u.plan !== 'free'
    );
  }
}
```

---

### 31. How do Templates differ from Directives?

**Answer:**

Templates are HTML views with bindings and expressions, Directives are reusable behavior/logic applied to DOM elements. Templates define the structure, Directives enhance or modify that structure. Directives are used within templates.

**Code Example:**

```typescript
// Template: Structure definition
@Component({
  selector: "app-highlight-demo",
  template: `
    <div [appHighlight]="'yellow'">Highlighted</div>
    <div *ngIf="isVisible">Conditional rendering</div>
    <div *ngFor="let item of items">{{ item }}</div>
  `,
})
export class HighlightDemoComponent {
  isVisible = true;
  items = ["A", "B", "C"];
}

// Directive: Behavior/logic applied to template elements
import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.appHighlight;
  }
}
```

---

### 32. What is a real-world Template example?

**Answer:**

E-commerce product listing page with search filter, sorting, pagination, dynamic category buttons, conditional "no results" message, product cards in grid layout, and add-to-cart buttons.

**Code Example:**

```typescript
@Component({
  selector: 'app-product-list',
  template: `
    <div class="product-list">
      <div class="filters">
        <input [(ngModel)]="searchTerm" placeholder="Search products" />
        <select [(ngModel)]="selectedCategory">
          <option value="">All Categories</option>
          <option *ngFor="let cat of categories" [value]="cat">{{ cat }}</option>
        </select>
      </div>

      <div *ngIf="filteredProducts.length > 0; else noProducts">
        <div class="product-grid">
          <div *ngFor="let product of paginatedProducts" class="product-card">
            <img [src]="product.image" [alt]="product.name" />
            <h3>{{ product.name }}</h3>
            <p class="price">${{ product.price }}</p>
            <button (click)="addToCart(product)">Add to Cart</button>
          </div>
        </div>

        <div class="pagination">
          <button (click)="previousPage()" [disabled]="currentPage === 1">Previous</button>
          <span>Page {{ currentPage }} of {{ totalPages }}</span>
          <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
        </div>
      </div>

      <ng-template #noProducts>
        <p class="no-results">No products found</p>
      </ng-template>
    </div>
  `,
})
export class ProductListComponent {
  searchTerm = '';
  selectedCategory = '';
  categories = ['Electronics', 'Books', 'Clothing'];
  products: any[] = [];
  currentPage = 1;
  pageSize = 10;

  get filteredProducts() {
    return this.products.filter(p =>
      p.name.includes(this.searchTerm) &&
      (!this.selectedCategory || p.category === this.selectedCategory)
    );
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.filteredProducts.slice(start, start + this.pageSize);
  }

  addToCart(product: any) { /* ... */ }
  previousPage() { if (this.currentPage > 1) this.currentPage--; }
  nextPage() { if (this.currentPage < this.totalPages) this.currentPage++; }
}
```

---

### 33. What are Template best practices?

**Answer:**

Keep templates simple, move complex logic to component class, use async pipe for observables, avoid heavy computations in templates, use trackBy in \*ngFor, prefer smart/dumb component separation, and use template variables for element access.

**Code Example:**

```typescript
// Best practice: Async pipe for observables
@Component({
  selector: "app-user-data",
  template: `
    <div>
      <!-- Using async pipe - no manual subscription -->
      <p>User: {{ (user$ | async)?.name }}</p>
      <p>Loading: {{ isLoading$ | async }}</p>

      <!-- TrackBy for performance -->
      <div *ngFor="let item of items; trackBy: trackByFn">
        {{ item.name }}
      </div>
    </div>
  `,
})
export class UserDataComponent {
  user$ = this.userService.getCurrentUser();
  isLoading$ = this.userService.isLoading$;
  items: any[] = [];

  constructor(private userService: UserService) {}

  trackByFn(index: number, item: any) {
    return item.id; // Use unique identifier for tracking
  }
}
```

---

### 34. What common Template mistakes happen?

**Answer:**

Calling functions in templates (recalculates on every change detection), using string concatenation in bindings, missing trackBy in \*ngFor, deep property access on objects, memory leaks with unsubscribed observables, and complex logic in templates.

**Code Example:**

```typescript
// ❌ WRONG: Performance issues
@Component({
  template: `
    <p>Count: {{ getCount() }}</p>
    <!-- Called on every change detection -->
    <p>{{ user.address.city.name }}</p>
    <!-- Deep property access -->
    <div *ngFor="let item of items">{{ item }}</div>
    <!-- Missing trackBy -->
    <p>{{ service.getData().subscribe(...) }}</p>
    <!-- Unsubscribed -->
  `,
})
export class BadTemplateComponent {
  getCount() {
    return this.count++;
  }
}

// ✅ CORRECT: Optimized templates
@Component({
  template: `
    <p>Count: {{ count }}</p>
    <p>{{ userCity }}</p>
    <div *ngFor="let item of items; trackBy: trackById">{{ item }}</div>
    <p>{{ data$ | async }}</p>
  `,
})
export class GoodTemplateComponent {
  count = 0;
  get userCity() {
    return this.user?.address?.city?.name ?? "Unknown";
  }
  data$ = this.service.getData();

  trackById(index: number, item: any) {
    return item.id;
  }
}
```

---

### 35. How do you troubleshoot Template issues?

**Answer:**

Check browser console for errors, use Angular DevTools to inspect component templates, verify data binding syntax, check *ngIf and *ngFor conditions, inspect CSS styling, add console.log in component methods, trace change detection cycles.

**Code Example:**

```typescript
// Debugging template issues
@Component({
  selector: "app-debug-template",
  template: `
    <div>
      {{ debugInfo() | json }}
      <p [title]="'Click to debug'">{{ data }}</p>
      <button (click)="onDebugClick()">Debug Template</button>
      <div [ngClass]="{ 'debug-mode': isDebugMode }">
        Content: {{ processedData }}
      </div>
    </div>
  `,
})
export class DebugTemplateComponent {
  data = "test data";
  isDebugMode = true;

  debugInfo() {
    return { data: this.data, timestamp: new Date() };
  }

  get processedData() {
    console.log("Processing data...", this.data);
    return this.data.toUpperCase();
  }

  onDebugClick() {
    console.log("Template state:", { data: this.data });
  }
}
```

---

### 36. How do Templates connect to Angular?

**Answer:**

Templates are the view layer of Angular components. They use data binding to connect to component state, directives for DOM manipulation, services for data, dependency injection for component dependencies, and change detection to keep UI in sync.

**Code Example:**

```typescript
// Complete template ecosystem
import { Component, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class DataService {
  getData() {
    return new Observable(/* ... */);
  }
}

@Component({
  selector: "app-complete-template",
  template: `
    <div class="container">
      <!-- Data binding with component property -->
      <h1>{{ title }}</h1>

      <!-- Property binding with directive -->
      <button [disabled]="isDisabled" [appLoadingState]="isLoading">
        Submit
      </button>

      <!-- Event binding to component method -->
      <input (keyup)="onKeyup($event)" />

      <!-- Directive with template -->
      <div *ngIf="isVisible">Visible content</div>
      <div *ngFor="let item of items; trackBy: trackByFn">
        {{ item.name }}
      </div>

      <!-- Async pipe with service observable -->
      <p>Status: {{ status$ | async }}</p>

      <!-- Template reference variable -->
      <input #nameInput />
      <button (click)="onClick(nameInput.value)">Use Value</button>
    </div>
  `,
})
export class CompleteTemplateComponent {
  title = "Template Ecosystem";
  isDisabled = false;
  isLoading = false;
  isVisible = true;
  items = [{ name: "Item 1", id: 1 }];
  status$ = this.dataService.getData();

  constructor(private dataService: DataService) {}

  onKeyup(event: any) {
    /* ... */
  }
  onClick(value: string) {
    console.log(value);
  }
  trackByFn(index: number, item: any) {
    return item.id;
  }
}
```

---

## 4. Directives

### 37. What is the role of Directives in Angular?

**Answer:**

Directives are classes that add behavior, structure, or presentation logic to DOM elements. There are two types: structural (*ngIf, *ngFor) and attribute (modify appearance/behavior). Directives extend HTML capabilities and enable reusable behavior patterns.

**Code Example:**

```typescript
import { Directive, ElementRef, HostListener, OnInit } from "@angular/core";

// Attribute directive: Adds behavior to element
@Directive({
  selector: "[appHighlight]",
})
export class HighlightDirective {
  constructor(private el: ElementRef) {}

  @HostListener("mouseenter")
  onMouseEnter() {
    this.el.nativeElement.style.backgroundColor = "yellow";
  }

  @HostListener("mouseleave")
  onMouseLeave() {
    this.el.nativeElement.style.backgroundColor = "";
  }
}

// Usage: <p appHighlight>Hover me</p>
```

---

### 38. Why are Directives important in Angular?

**Answer:**

Directives enable code reuse, reduce boilerplate, provide clean abstraction over DOM manipulation, declaratively modify elements, and encapsulate common behavior patterns easily applied across templates.

**Code Example:**

```typescript
// Structural directive example
import { Component } from "@angular/core";

@Component({
  selector: "app-structural-directive",
  template: `
    <div *ngIf="isVisible">Visible when true</div>
    <div *ngFor="let item of items">{{ item }}</div>
    <div [ngSwitch]="status">
      <p *ngSwitchCase="'active'">Active</p>
      <p *ngSwitchCase="'inactive'">Inactive</p>
      <p *ngSwitchDefault>Unknown</p>
    </div>
  `,
})
export class StructuralDirectiveComponent {
  isVisible = true;
  items = ["A", "B", "C"];
  status = "active";
}
```

---

### 39. When should you create custom Directives?

**Answer:**

Create custom directives when you need to apply behavior to multiple elements, encapsulate DOM manipulation, or extend element capabilities in a reusable way. Avoid when simple styling or simpler solutions exist.

**Code Example:**

```typescript
// Custom directive: Validate email input
import { Directive, Input } from "@angular/core";
import { NgControl } from "@angular/forms";

@Directive({
  selector: "[appEmailValidator]",
})
export class EmailValidatorDirective {
  constructor(private control: NgControl) {}

  ngOnInit() {
    const validator = (control: any) => {
      const email = control.value;
      if (!email) return null;
      const isValid = /^[^@]+@[^@]+\.[^@]+$/.test(email);
      return isValid ? null : { emailInvalid: true };
    };
    this.control.control?.setValidators(validator);
  }
}

// Usage: <input appEmailValidator />
```

---

### 40. How are Directives applied in practice?

**Answer:**

Apply directives by adding selector to HTML elements. Structural directives use *prefix (*ngIf, \*ngFor). Attribute directives use bracket or regular selectors. Pass data via @Input properties. Handle events via @HostListener.

**Code Example:**

```typescript
// Permission directive: Show/hide based on user role
import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: "[appPermission]",
})
export class PermissionDirective {
  @Input()
  set appPermission(permission: string) {
    if (this.hasPermission(permission)) {
      this.container.createEmbeddedView(this.template);
    } else {
      this.container.clear();
    }
  }

  constructor(
    private template: TemplateRef<any>,
    private container: ViewContainerRef,
    private authService: AuthService,
  ) {}

  private hasPermission(permission: string) {
    return this.authService.userHasPermission(permission);
  }
}

// Usage: <p *appPermission="'admin'">Admin only</p>
```

---

### 41. What are Directive strengths?

**Answer:**

Reusability, encapsulation, clean separation of DOM logic from components, declarative syntax, easy to test, composable, reduces code duplication, and provides clear intent.

**Code Example:**

```typescript
// Directive strength: Reusable focus behavior
impor { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[appAutoFocus]',
})
export class AutoFocusDirective implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.focus();
  }
}

// Can be applied to any element: <input appAutoFocus />
// Eliminates boilerplate in component class
```

---

### 42. What Directive tradeoffs exist?

**Answer:**

Increases learning curve, complex directives harder to debug, naming conventions important for clarity, performance impact with many directives, and potential for misuse if not well-designed.

**Code Example:**

```typescript
// ❌ WRONG: Too complex, hard to understand
@Directive({
  selector: "[complexLogic]",
})
export class ComplexLogicDirective {
  // 300+ lines of nested logic
  // Multiple input properties
  // Complex lifecycle interactions
}

// ✅ CORRECT: Single responsibility
@Directive({
  selector: "[appDebounceInput]",
})
export class DebounceInputDirective {
  @Input() debounceTime = 300;
  @Output() debounceValue = new EventEmitter<string>();

  // Single, clear purpose
}
```

---

### 43. How do Directives differ from Components?

**Answer:**

Components have templates and styles, directives don't. Components manage UI sections, directives add behavior to elements. Components create new scope, directives enhance existing elements. Components are instantiated, directives are applied.

**Code Example:**

```typescript
// Component: Creates UI section
@Component({
  selector: "app-button",
  template: `<button>{{ label }}</button>`,
})
export class ButtonComponent {
  @Input() label: string;
}

// Directive: Adds behavior to existing elements
@Directive({
  selector: "[appButton]",
})
export class ButtonDirective {
  // Alters appearance/behavior of existing button
}

// Usage difference:
// <app-button label="Click"></app-button> <!-- Component -->
// <button appButton>Click</button> <!-- Directive -->
```

---

### 44. What is a real-world Directive example?

**Answer:**

Form validation directive that debounces input, shows loading spinner, displays error messages, and auto-saves to backend. Validation logic reusable across many form inputs.

**Code Example:**

```typescript
@Directive({
  selector: "[appAsyncValidate]",
})
export class AsyncValidateDirective implements OnDestroy {
  @Input() validateUrl: string;
  private destroy$ = new Subject<void>();

  constructor(
    private control: NgControl,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.control.valueChanges
      ?.pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((value) => this.http.post(this.validateUrl, { value })),
        takeUntil(this.destroy$),
      )
      .subscribe((result) => {
        if (result.isValid) {
          this.control.control?.setErrors(null);
        } else {
          this.control.control?.setErrors({ asyncInvalid: true });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Usage: <input appAsyncValidate validateUrl="/api/validate" />
```

---

### 45. What are Directive best practices?

**Answer:**

Use single responsibility principle, create reusable directives, document with JSDoc, handle lifecycle properly, avoid heavy DOM operations, use @HostListener sparingly, test directives in isolation, and use clear naming.

**Code Example:**

```typescript
// Best practice: Well-designed directive
import { Directive, Host Optional, Input } from '@angular/core';

@Directive({
  selector: '[appFormControl]',
})
export class FormControlDirective implements OnDestroy {
  @Input() appFormControl: boolean = false;
  private destroy$ = new Subject<void>();

  /** Initialize form control bindings */
  ngOnInit() {
    // Setup logic
  }

  /** Cleanup subscriptions */
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// Best practice: Async cleanup
@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective implements OnDestroy, OnInit {
  @Output() clickOutside = new EventEmitter<MouseEvent>();
  private destroy$ = new Subject<void>();

  constructor(private el: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.clickOutside.emit(event);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

### 46. What common Directive mistakes happen?

**Answer:**

Not handling lifecycle (memory leaks), heavy computations in directives, poor naming, complex logic that should be in component, not cleaning up subscriptions, assuming specific HTML structure, and ignoring accessibility.

**Code Example:**

```typescript
// ❌ WRONG: Memory leak
@Directive({
  selector: "[appBadScroll]",
})
export class BadScrollDirective {
  constructor(private el: ElementRef) {
    document.addEventListener("scroll", () => {
      // Never unsubscribed!
    });
  }
}

// ✅ CORRECT: Proper cleanup
@Directive({
  selector: "[appGoodScroll]",
})
export class GoodScrollDirective implements OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
  ) {
    this.renderer.listen("document", "scroll", () => {
      // Handle scroll
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

### 47. How do you troubleshoot Directive issues?

**Answer:**

Check if directive is properly declared, verify selector matches HTML, inspect with DevTools, add console logs in lifecycle hooks, check for name conflicts, verify @Input/@Output bindings, and test in isolation.

**Code Example:**

```typescript
// Debugging directive
var { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appDebug]',
})
export class DebugDirective implements OnInit {
  @Input() appDebug: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    if (this.appDebug) {
      console.log('Directive applied to:', this.el.nativeElement);
      console.log('Element classes:', this.el.nativeElement.className);
      console.log('Element attributes:', Array.from(this.el.nativeElement.attributes).map((a) => a.name));
    }
  }

  ngOnChanges(changes: any) {
    if (this.appDebug) {
      console.log('Directive input changed:', changes);
    }
  }
}
```

---

### 48. How do Directives connect to Angular?

**Answer:**

Directives are core to Angular. They enhance templates, work with dependency injection, use lifecycle hooks, access ElementRef for DOM manipulation, emit events with @Output, and integrate with forms and validation systems.

**Code Example:**

```typescript
// Complete directive ecosystem
import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  HostListener,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Directive({
  selector: "[appFormField]",
})
export class FormFieldDirective implements OnInit, OnDestroy {
  @Input() required = false;
  @Input() hint: string;
  @Output() fieldBlurred = new EventEmitter<FocusEvent>();
  @Output() fieldFocused = new EventEmitter<FocusEvent>();

  private destroy$ = new Subject<void>();

  constructor(
    private el: ElementRef,
    private formService: FormService,
  ) {}

  ngOnInit() {
    // Subscribe to form service updates
    this.formService.fieldUpdates
      .pipe(takeUntil(this.destroy$))
      .subscribe((updates) => {
        this.updateField(updates);
      });
  }

  @HostListener("focus", ["$event"])
  onFocus(event: FocusEvent) {
    this.fieldFocused.emit(event);
    this.el.nativeElement.classList.add("focused");
  }

  @HostListener("blur", ["$event"])
  onBlur(event: FocusEvent) {
    this.fieldBlurred.emit(event);
    this.el.nativeElement.classList.remove("focused");
  }

  private updateField(updates: any) {
    if (updates.hasError) {
      this.el.nativeElement.classList.add("error");
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

---

## 5. Data binding

### 49. What is the role of Data binding in Angular fundamentals?

**Answer:**

Data binding synchronizes component properties with the template view, creating a two-way connection. It enables dynamic UI updates when data changes, handles user input capture, and maintains consistency between TypeScript component state and HTML template without manual DOM manipulation.

**Code Example:**

```typescript
import { Component } from "@angular/core";

@Component({
  selector: "app-data-sync",
  template: `
    <div class="form-container">
      <!-- Interpolation: {{ }} -->
      <p>Current User: {{ currentUser }}</p>

      <!-- Property binding: [ ] -->
      <img [src]="userImage" [alt]="userName" />

      <!-- Event binding: ( ) -->
      <input (keyup)="onNameChange($event)" />

      <!-- Two-way binding: [( )] -->
      <input [(ngModel)]="searchQuery" placeholder="Search..." />

      <p>Search Result: {{ searchQuery }}</p>
    </div>
  `,
})
export class DataSyncComponent {
  currentUser = "John Doe";
  userImage = "/images/user.png";
  userName = "User Avatar";
  searchQuery = "";

  onNameChange(event: any) {
    console.log("Name changed:", event.target.value);
  }
}
```

---

### 50. Why is the concept of Data binding important in Angular fundamentals?

**Answer:**

Data binding is crucial because it eliminates manual DOM manipulation, keeps UI and data synchronized automatically, enables reactive programming patterns, and reduces boilerplate code. It's foundational to Angular's declarative approach.

**Code Example:**

```typescript
// Real-world: Live search with data binding
@Component({
  selector: "app-live-search",
  template: `
    <div class="search-box">
      <input
        [(ngModel)]="searchTerm"
        (ngModelChange)="onSearchChange($event)"
        placeholder="Search products..."
      />
      <div class="results">
        <div *ngFor="let product of filteredProducts">
          <span [class.highlighted]="product.name.includes(searchTerm)">
            {{ product.name }}
          </span>
          <p>${{ product.price }}</p>
        </div>
      </div>
    </div>
  `,
})
export class LiveSearchComponent {
  searchTerm = "";
  products = [
    { name: "Laptop", price: 999 },
    { name: "Mouse", price: 25 },
    { name: "Keyboard", price: 75 },
  ];

  get filteredProducts() {
    return this.products.filter((p) =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()),
    );
  }

  onSearchChange(term: string) {
    console.log("Searching for:", term);
  }
}
```

---

### 51. When should a team focus on Data binding?

**Answer:**

Focus on data binding architecture when designing forms, real-time updates, parent-child communication, or reactive features. Consider binding strategy (one-way vs two-way) during component design to prevent performance issues and maintain clarity.

**Code Example:**

```typescript
// When to focus: Complex parent-child binding
@Component({
  selector: "app-todo-list",
  template: `
    <div class="todo-app">
      <app-todo-input (onAddTodo)="addTodo($event)"></app-todo-input>
      <app-todo-items
        [todos]="todos"
        (onToggle)="toggleTodo($event)"
        (onDelete)="deleteTodo($event)"
      >
      </app-todo-items>
    </div>
  `,
})
export class TodoListComponent {
  todos = [];

  addTodo(todo: string) {
    this.todos.push({ id: Date.now(), text: todo, done: false });
  }

  toggleTodo(id: number) {
    const todo = this.todos.find((t) => t.id === id);
    if (todo) todo.done = !todo.done;
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((t) => t.id !== id);
  }
}
```

---

### 52. How is Data binding applied in practice?

**Answer:**

Implement data binding by choosing appropriate syntax: interpolation {{}} for display, property binding [] for attributes, event binding () for user actions, and two-way binding [()] for form inputs. Use async pipe for observables to avoid manual subscriptions.

**Code Example:**

```typescript
// Applied: Real-world form with all binding types
@Component({
  selector: "app-user-form",
  template: `
    <form (ngSubmit)="onSubmit()">
      <!-- String interpolation -->
      <p>Form Status: {{ formStatus }}</p>

      <!-- Property binding -->
      <button [disabled]="!isFormValid">Submit</button>

      <!-- Event binding -->
      <input (change)="onInputChange($event)" />

      <!-- Two-way binding for forms -->
      <input [(ngModel)]="user.email" name="email" />
      <input [(ngModel)]="user.name" name="name" />

      <!-- Async pipe with Observable -->
      <div *ngIf="isLoading$ | async">Loading...</div>
    </form>
  `,
})
export class UserFormComponent {
  formStatus = "idle";
  isFormValid = false;
  user = { email: "", name: "" };
  isLoading$ = of(false);

  onInputChange(event: any) {
    this.isFormValid = event.target.value.length > 0;
  }

  onSubmit() {
    this.formStatus = "submitted";
  }
}
```

---

### 53. What strengths does Data binding bring?

**Answer:**

Data binding provides automatic synchronization between model and view, reduces boilerplate code, enables reactive programming, improves code readability, supports component communication, and enforces separation of concerns between logic and presentation.

**Code Example:**

```typescript
// Strength: Auto-sync reduces bugs
@Component({
  selector: "app-counter",
  template: `
    <div class="counter">
      <!-- This automatically stays in sync with component.count -->
      <p>Count: {{ count }}</p>

      <!-- Event binding connects to method -->
      <button (click)="increment()">+</button>
      <button (click)="decrement()">-</button>

      <!-- Two-way binding on input -->
      <input [(ngModel)]="customValue" />
      <p>Custom: {{ customValue }}</p>
    </div>
  `,
})
export class CounterComponent {
  count = 0;
  customValue = "";

  increment() {
    this.count++;
    // DOM automatically updates via data binding
  }

  decrement() {
    this.count--;
    // No manual DOM manipulation needed
  }
}
```

---

### 54. What tradeoffs come with Data binding?

**Answer:**

Two-way binding can hide data flow complexity, excessive binding ties templates to component logic too tightly, performance costs with many bindings, and testing becomes harder when bindings are complex. One-way binding is often safer for maintainability.

**Code Example:**

```typescript
// ❌ WRONG: Over-using two-way binding
@Component({
  template: `
    <input [(ngModel)]="state1" />
    <input [(ngModel)]="state2" />
    <input [(ngModel)]="state3" />
    <!-- Hard to track where state changes originate -->
  `,
})
// Too much implicit state change

// ✅ CORRECT: Mix binding strategies appropriately
@Component({
  template: `
    <input [value]="formData.name" (change)="updateName($event)" />
    <!-- Explicit: clear when data flows -->
  `,
})
export class ProperBindingComponent {
  formData = { name: "" };

  updateName(event: any) {
    this.formData.name = event.target.value;
  }
}
```

---

### 55. How does Data binding differ from Dependency injection?

**Answer:**

Data binding connects component properties to template views dynamically; dependency injection provides component dependencies. Data binding is about model-view synchronization; DI is about managing services and dependencies cleanly.

**Code Example:**

```typescript
// Data Binding: Model-View synchronization
@Component({
  template: `<p>{{ message }}</p>`,
})
export class DataBindingExample {
  message = "Hello"; // Binds to template
}

// Dependency Injection: Service provision
@Injectable({ providedIn: "root" })
export class MessageService {
  getMessage() {
    return "Hello from Service";
  }
}

@Component({
  template: `<p>{{ message }}</p>`,
})
export class DIExample {
  message: string;

  constructor(private msgService: MessageService) {
    // DI injects service, binding shows result
    this.message = msgService.getMessage();
  }
}
```

---

### 56. What is a good real-world example of Data binding?

**Answer:**

E-commerce shopping cart where adding items triggers automatic total price update via binding, product search filters update results in real-time, and form validation enables/disables submit button based on input validity.

**Code Example:**

```typescript
@Component({
  selector: "app-shopping-cart",
  template: `
    <div class="cart">
      <div *ngFor="let item of cartItems">
        <span>{{ item.name }} - ${{ item.price }}</span>
        <button (click)="removeItem(item.id)">Remove</button>
      </div>
      <!-- Binding automatically updates total -->
      <p class="total">Total: ${{ cartTotal }}</p>

      <!-- Button state bound to cart -->
      <button [disabled]="cartItems.length === 0" (click)="checkout()">
        Checkout
      </button>
    </div>
  `,
})
export class ShoppingCartComponent {
  cartItems = [];

  get cartTotal() {
    return this.cartItems.reduce((sum, item) => sum + item.price, 0);
  }

  removeItem(id: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
  }

  checkout() {
    console.log("Checkout total:", this.cartTotal);
  }
}
```

---

### 57. What is a best practice for Data binding?

**Answer:**

Prefer one-way binding for better predictability, use async pipe for observables to avoid manual subscriptions, avoid complex expressions in templates, keep data flow explicit and unidirectional where possible, and use trackBy in \*ngFor for performance.

**Code Example:**

```typescript
export class BestPracticesComponent {
  constructor(private dataService: DataService) {}

  // Best practice: Use async pipe
  users$ = this.dataService.getUsers();

  // Better than:
  // users: User[];
  // ngOnInit() { this.dataService.getUsers().subscribe(u => this.users = u); }

  // Template:
  // <div *ngFor="let user of users$ | async; trackBy: trackById">
  //   {{ user.name }} <!-- Auto-unsubscribes when component destroyed -->
  // </div>

  trackById(index: number, user: any) {
    return user.id; // DOM only updates if id changes
  }
}
```

---

### 58. What is a common mistake around Data binding?

**Answer:**

Calling methods in interpolation ({{myMethod()}}) recalculates on every change detection, deep property binding ({{user.address.city.name}}) breaks if intermediate object is null, and unmanaged subscriptions in two-way binding cause memory leaks.

**Code Example:**

```typescript
// ❌ WRONG: Performance killer
@Component({
  template: `<p>Results: {{ performExpensiveCalculation() }}</p>`,
})
export class BadBindingComponent {
  performExpensiveCalculation() {
    // Called on EVERY change detection cycle
    return computeSomethingExpensive();
  }
}

// ✅ CORRECT: Cache the calculation
@Component({
  template: `<p>Results: {{ cachedResult }}</p>`,
})
export class GoodBindingComponent {
  cachedResult: number;

  ngOnInit() {
    // Calculated once
    this.cachedResult = computeSomethingExpensive();
  }
}
```

---

### 59. How do you troubleshoot Data binding-related issues?

**Answer:**

Add console logs to component properties, use Angular DevTools to inspect bindings, check browser console for binding errors, enable logging in templates with safe navigation operator ({{user?.name}}), and use the debugger to verify data flow.

**Code Example:**

```typescript
@Component({
  selector: "app-binding-debug",
  template: `
    <div>
      <!-- Debug: Print value and type -->
      <p>Value: {{ debugValue | json }}</p>

      <!-- Safe navigation to prevent null errors -->
      <p>User: {{ currentUser?.name }}</p>

      <!-- Create breakpoint on binding -->
      <button (click)="debugLog()">Debug State</button>
    </div>
  `,
})
export class BindingDebugComponent {
  debugValue: any;
  currentUser: any = null;

  debugLog() {
    console.log("Component state:", {
      value: this.debugValue,
      user: this.currentUser,
    });
  }

  ngOnInit() {
    // If binding shows wrong value, check here
    console.log("Initial binding state check");
  }
}
```

---

### 60. How does Data binding connect to the rest of Angular fundamentals?

**Answer:**

Data binding is the mechanism that connects all Angular pieces together: components expose properties that bind to templates, services provide data to components which then bind to views, directives modify bindings, and change detection synchronizes bindings with the DOM.

**Code Example:**

```typescript
// Complete ecosystem: Service -> Component -> Template via Binding
@Injectable({ providedIn: "root" })
export class ArticleService {
  getArticles() {
    return of([{ id: 1, title: "Angular Binding", content: "..." }]);
  }
}

@Component({
  selector: "app-article-view",
  template: `
    <article *ngFor="let article of articles$ | async; trackBy: trackById">
      <!-- Property binding to component property -->
      <h2 [title]="article.title">{{ article.title }}</h2>

      <!-- Event binding to component method -->
      <button (click)="readArticle(article.id)">Read More</button>

      <!-- Directive uses binding -->
      <div [appHighlight]="article.id">{{ article.content }}</div>
    </article>
  `,
})
export class ArticleViewComponent {
  articles$ = this.service.getArticles(); // Service -> Component

  constructor(private service: ArticleService) {}

  readArticle(id: number) {
    console.log("Reading article:", id);
  }

  trackById(index: number, article: any) {
    return article.id;
  }
}
```

---

## 6. Dependency injection

### 61. What is the role of Dependency injection in Angular fundamentals?

**Answer:**

In Angular fundamentals, the term Dependency injection refers to the pattern Angular uses to provide services
and shared dependencies cleanly. It is part of the foundation a candidate should be able to explain
clearly.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 62. Why is the concept of Dependency injection important in Angular fundamentals?

**Answer:**

This concept matters because it influences the pattern Angular uses to provide services and
shared dependencies cleanly. Good interview answers connect it to clarity, maintainability,
performance, security, or delivery depending on the situation.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 63. When should a team focus on Dependency injection?

**Answer:**

A team should focus on Dependency injection when the requirement depends on the pattern Angular uses
to provide services and shared dependencies cleanly. It becomes especially important when design
decisions, debugging, or architecture conversations depend on that area.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 64. How is Dependency injection applied in practice?

**Answer:**

In practice, Dependency injection is applied by making the pattern Angular uses to provide services
and shared dependencies cleanly explicit in the code, workflow, or collaboration pattern. The exact
shape depends on the stack, but the responsibility should stay predictable.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 65. What strengths does Dependency injection bring?

**Answer:**

The strengths of Dependency injection are better structure, better communication, and better control
over the pattern Angular uses to provide services and shared dependencies cleanly. It also makes
tradeoffs easier to explain to reviewers, interviewers, and teammates.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 66. What tradeoffs come with Dependency injection?

**Answer:**

The main tradeoff is extra complexity if Dependency injection is introduced without a real need or a
clear understanding of the pattern Angular uses to provide services and shared dependencies cleanly.
That usually leads to weak reasoning, overengineering, or fragile implementations.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 67. How does Dependency injection differ from Services?

**Answer:**

Dependency injection is centered on the pattern Angular uses to provide services and shared
dependencies cleanly, while Services is centered on the reusable classes that hold business logic,
shared state, or integration logic. They often work together, but they solve different parts of the
topic.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 68. What is a good real-world example of Dependency injection?

**Answer:**

A strong example is explaining how Dependency injection affects a real feature, workflow, bug,
migration, or design choice involving the pattern Angular uses to provide services and shared
dependencies cleanly. Interviewers usually care more about the reasoning than the definition alone.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 69. What is a best practice for Dependency injection?

**Answer:**

A good practice is to keep Dependency injection aligned with the actual requirement around the
pattern Angular uses to provide services and shared dependencies cleanly. Teams should document
intent, keep the implementation readable, and validate important paths early.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 70. What is a common mistake around Dependency injection?

**Answer:**

A common mistake is naming Dependency injection without understanding how it affects the pattern
Angular uses to provide services and shared dependencies cleanly. In real work, that usually appears
as poor decisions, weak debugging, or incomplete explanations.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 71. How do you troubleshoot Dependency injection-related issues?

**Answer:**

When troubleshooting Dependency injection, first verify whether the pattern Angular uses to provide
services and shared dependencies cleanly is behaving as expected. Then check surrounding
dependencies, inputs, configuration, logs, and edge cases before changing the design.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

### 72. How does Dependency injection connect to the rest of Angular fundamentals?

**Answer:**

Dependency injection connects to the rest of Angular fundamentals by giving structure to the pattern
Angular uses to provide services and shared dependencies cleanly. It is one of the pieces that turns
isolated facts into a coherent end-to-end explanation.

**Sample:**

```ts
// Concept: 6. Dependency injection
@Component({
  selector: "app-demo",
  template: `<h1>{{ title }}</h1>`,
})
export class DemoComponent {
  title = "6. Dependency injection";
}
```

---

## 7. Services

### 73. What is the role of Services in Angular fundamentals?

**Answer:**

Services encapsulate business logic, data access, and reusable functionality that can be shared across components via dependency injection.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class LoggerService {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
  error(message: string) {
    console.error(`[ERROR] ${message}`);
  }
}

@Component({
  selector: "app-demo",
  template: `<button (click)="onLog()">Log Message</button>`,
})
export class DemoComponent {
  constructor(private logger: LoggerService) {}
  onLog() {
    this.logger.log("Button clicked");
  }
}
```

---

### 74. Why is the concept of Services important in Angular fundamentals?

**Answer:**

Services separate concerns, reduce code duplication, enable testability, and support dependency injection patterns for better application architecture.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class UserService {
  getUsers() {
    return [{ id: 1, name: "Alice" }];
  }
}

@Component({
  template: `<p *ngFor="let user of users">{{ user.name }}</p>`,
})
export class UserListComponent {
  users: any[] = [];
  constructor(userService: UserService) {
    this.users = userService.getUsers();
  }
}
```

---

### 75. When should a team focus on Services?

**Answer:**

Focus on services when you need to share data or logic across multiple components, handle backend communication, or manage application state.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class CartService {
  private items: any[] = [];
  addItem(item: any) {
    this.items.push(item);
  }
  getItems() {
    return [...this.items];
  }
}

@Component({
  selector: "app-cart",
  template: `<div>{{ cart.getItems().length }} items</div>`,
})
export class CartComponent {
  constructor(public cart: CartService) {}
}
```

---

### 76. How is Services applied in practice?

**Answer:**

Define services with @Injectable, inject them via constructor, and use them to access data or execute business logic from components.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  login(user: string) {
    this.isAuthenticated = true;
  }
  isLoggedIn() {
    return this.isAuthenticated;
  }
}

@Component({
  template: `<p *ngIf="auth.isLoggedIn()">Welcome back</p>`,
})
export class Dashboard {
  constructor(public auth: AuthService) {}
}
```

---

### 77. What strengths does Services bring?

**Answer:**

Services promote reusability, testability, separation of concerns, and enable centralized data management across the application.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class CacheService {
  private cache = new Map<string, any>();
  set(key: string, value: any) {
    this.cache.set(key, value);
  }
  get(key: string) {
    return this.cache.get(key);
  }
}

@Component({})
export class DataComponent {
  constructor(private cache: CacheService) {
    const cached = this.cache.get("data");
  }
}
```

---

### 78. What tradeoffs come with Services?

**Answer:**

Services add complexity if overused, require careful dependency management, and can create hidden dependencies if not properly documented.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class NotificationService {
  show(message: string) {
    alert(message);
  }
}

@Component({})
export class BadComponent {
  // Too many service dependencies = tight coupling
  constructor(
    private notif: NotificationService,
    private users: UserService,
    private cart: CartService,
    private auth: AuthService,
  ) {}
}
```

---

### 79. How does Services differ from Routing?

**Answer:**

Services handle business logic and data access, while Routing manages URL-based navigation and component loading based on application state.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class DataService {
  getData() {
    return [{ id: 1, title: "Item" }];
  }
}

// Routing handles which component to show
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "details/:id", component: DetailsComponent },
];
```

---

### 80. What is a good real-world example of Services?

**Answer:**

E-commerce app requires product service for catalog, cart service for shopping, order service for checkout, and auth service for user management.

**Sample:**

```ts
@Injectable({ providedIn: 'root' })
export class ProductService {
  getProducts() { return [{ id: 1, name: 'Laptop', price: 999 }]; }
  getProduct(id: number) { return this.getProducts().find(p => p.id === id); }
}

@Component({
  template: `<div *ngFor="let p of (productService.getProducts())">{{ p.name }} - ${{ p.price }}</div>`
})
export class CatalogComponent {
  constructor(public productService: ProductService) {}
}
```

---

### 81. What is a best practice for Services?

**Answer:**

Keep services single-purpose, use providedIn: 'root' for singleton pattern, inject dependencies rather than creating instances, and always type your data.

**Sample:**

```ts
interface Order {
  id: number;
  total: number;
}

@Injectable({ providedIn: "root" })
export class OrderService {
  getOrders(): Observable<Order[]> {
    return of([{ id: 1, total: 150 }]);
  }
}

@Component({})
export class OrdersComponent {
  orders$ = this.orderService.getOrders();
  constructor(private orderService: OrderService) {}
}
```

---

### 82. What is a common mistake around Services?

**Answer:**

Creating multiple instances instead of using singleton, circular dependencies, storing UI state in services, and failing to unsubscribe from observables.

**Sample:**

```ts
// BAD: Creates new instance every time
@Injectable()
export class BadService {}

// GOOD: Singleton
@Injectable({ providedIn: "root" })
export class GoodService {}

// BAD: Circular dependency
@Injectable()
export class ServiceA {
  constructor(private sb: ServiceB) {}
}
@Injectable()
export class ServiceB {
  constructor(private sa: ServiceA) {}
}
```

---

### 83. How do you troubleshoot Services-related issues?

**Answer:**

Check injection tokens, verify providedIn scope, use Angular DevTools to inspect dependency tree, enable debug mode, and test services in isolation.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class DebugService {
  private subscription: any;
  getData() {
    // Memory leak if not unsubscribed
    this.subscription = someObservable.subscribe((data) => console.log(data));
  }
  cleanup() {
    this.subscription?.unsubscribe();
  }
}
```

---

### 84. How does Services connect to the rest of Angular fundamentals?

**Answer:**

Services work with DI to provide dependencies, integrate with lifecycle hooks for cleanup, use observables with templates via async pipe, and support routing guards.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class AnalyticsService {
  trackEvent(event: string) {
    console.log(`Event: ${event}`);
  }
}

@Component({
  template: `<button (click)="onAction()">Action</button>`,
  providers: [AnalyticsService],
})
export class ActionComponent implements OnDestroy {
  constructor(private analytics: AnalyticsService) {}
  onAction() {
    this.analytics.trackEvent("action_clicked");
  }
  ngOnDestroy() {
    /* cleanup */
  }
}
```

---

## 8. Routing

### 85. What is the role of Routing in Angular fundamentals?

**Answer:**

Routing maps URLs to components and enables single-page navigation without full page reloads, providing users seamless navigation experiences.

**Sample:**

```ts
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" },
];

@NgModule({ imports: [RouterModule.forRoot(routes)] })
export class AppModule {}

@Component({
  template: `<a routerLink="/home">Home</a> | <router-outlet></router-outlet>`,
})
export class AppComponent {}
```

---

### 86. Why is the concept of Routing important in Angular fundamentals?

**Answer:**

Routing enables multi-view applications, bookmarkable URLs, browser history support, and feature-based organization with lazy loading capability.

**Sample:**

```ts
const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "product/:id", component: ProductDetailComponent },
];

@Component({
  template: ` <button [routerLink]="['/product', 123]">View Product</button> `,
})
export class ListComponent {}
```

---

### 87. When should a team focus on Routing?

**Answer:**

Focus on routing when building multi-page applications, implementing feature-based lazy loading, protecting routes with guards, or adding navigation complexity.

**Sample:**

```ts
const routes: Routes = [
  {
    path: "admin",
    component: AdminComponent,
    children: [
      { path: "users", component: UsersComponent },
      { path: "settings", component: SettingsComponent },
    ],
  },
];

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class AdminLayoutComponent {}
```

---

### 88. How is Routing applied in practice?

**Answer:**

Define a routes array, configure RouterModule in imports, use routerLink directives for navigation, and access route params with ActivatedRoute.

**Sample:**

```ts
@Component({
  template: `<p>Product: {{ productId }}</p>`,
})
export class ProductDetailComponent implements OnInit {
  productId: string = "";
  constructor(private route: ActivatedRoute) {}
  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get("id") || "";
  }
}

const routes: Routes = [
  { path: "product/:id", component: ProductDetailComponent },
];
```

---

### 89. What strengths does Routing bring?

**Answer:**

Routing enables bookmarkable URLs, enables back/forward browser buttons, supports feature lazy loading for performance, and organizes code by features.

**Sample:**

```ts
const routes: Routes = [
  { path: "home", component: HomeComponent },
  {
    path: "shop",
    loadChildren: () => import("./shop/shop.module").then((m) => m.ShopModule),
  },
];

@Component({
  template: `
    <nav>
      <a routerLink="/home" routerLinkActive="active">Home</a>
      <a routerLink="/shop" routerLinkActive="active">Shop</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class NavComponent {}
```

---

### 90. What tradeoffs come with Routing?

**Answer:**

Complex routing configurations can be hard to maintain, deep nesting creates cognitive overhead, guard logic can complicate debugging, and SPAs require client-side error handling.

**Sample:**

```ts
// Complex nested routing
const routes: Routes = [
  {
    path: "app",
    component: AppLayout,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        component: Dashboard,
        canDeactivate: [UnsavedGuard],
        children: [
          { path: "analytics", component: AnalyticsComponent },
          { path: "reports", component: ReportsComponent },
        ],
      },
    ],
  },
];
```

---

### 91. How does Routing differ from Lifecycle hooks?

**Answer:**

Routing handles navigation and URL mapping, while lifecycle hooks execute component logic at specific moments in a component's existence.

**Sample:**

```ts
const routes: Routes = [{ path: "details/:id", component: DetailsComponent }];

@Component({
  template: `<p>{{ title }}</p>`,
})
export class DetailsComponent implements OnInit, OnDestroy {
  ngOnInit() {
    /* Called when component loads via routing */
  }
  ngOnDestroy() {
    /* Called when leaving route */
  }
}
```

---

### 92. What is a good real-world example of Routing?

**Answer:**

E-commerce app with /products list, /products/:id detail page, /cart, /checkout, /order/:id confirmation, all behind /admin with authentication guards.

**Sample:**

```ts
const routes: Routes = [
  { path: "products", component: ProductListComponent },
  { path: "products/:id", component: ProductDetailComponent },
  {
    path: "checkout",
    component: CheckoutComponent,
    canActivate: [AuthGuard, CartGuard],
  },
  {
    path: "order/:id",
    component: OrderConfirmComponent,
    canActivate: [AuthGuard],
  },
];
```

---

### 93. What is a best practice for Routing?

**Answer:**

Keep routes organized by feature, use lazy loading for large modules, implement route guards for security, provide meaningful URLs, and handle 404s gracefully.

**Sample:**

```ts
const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "profile", component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: "settings",
    loadChildren: () =>
      import("./settings/settings.module").then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
  },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", component: NotFoundComponent },
];
```

---

### 94. What is a common mistake around Routing?

**Answer:**

Not handling the 404 route, not implementing route guards, creating overly deep nesting, hardcoding routes instead of using constants, and not lazy loading features.

**Sample:**

```ts
// BAD: Route guards missing
const routes: Routes = [
  { path: "admin", component: AdminComponent }, // Not protected!
];

// GOOD: Route guards applied
const routes: Routes = [
  { path: "admin", component: AdminComponent, canActivate: [AdminGuard] },
];
```

---

### 95. How do you troubleshoot Routing-related issues?

**Answer:**

Check browser console for routing errors, verify routes array syntax, use Angular DevTools to inspect router state, enable enableTracing, test guards in isolation.

**Sample:**

```ts
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true, // Enable routing debug logs
    }),
  ],
})
export class AppModule {}

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  canActivate() {
    console.log("AuthGuard checking..."); // Debug output
    return true;
  }
}
```

---

### 96. How does Routing connect to the rest of Angular fundamentals?

**Answer:**

Routing uses Services for data, integrates with lifecycle hooks for cleanup, employs dependency injection for guards, and uses directives for navigation links.

**Sample:**

```ts
@Injectable({ providedIn: "root" })
export class DataService {
  getData() {
    return of([]);
  }
}

const routes: Routes = [
  {
    path: "data",
    component: DataComponent,
    resolve: { items: DataResolver }, // Using resolver with service
  },
];

@Injectable({ providedIn: "root" })
export class DataResolver implements Resolve<any> {
  constructor(private data: DataService) {}
  resolve() {
    return this.data.getData();
  }
}
```

---

## 9. Lifecycle hooks

### 97. What is the role of Lifecycle hooks in Angular fundamentals?

**Answer:**

Lifecycle hooks provide predefined moments to execute logic when a component initializes, changes properties, renders views, or destroys.

**Sample:**

```ts
@Component({
  selector: "app-greeting",
  template: `<p>{{ message }}</p>`,
})
export class GreetingComponent implements OnInit, OnDestroy {
  message = "";

  ngOnInit() {
    this.message = "Component initialized!";
    console.log("Component created");
  }

  ngOnDestroy() {
    console.log("Component destroyed - cleanup here");
  }
}
```

---

### 98. Why is the concept of Lifecycle hooks important in Angular fundamentals?

**Answer:**

Lifecycle hooks enable proper initialization, data loading, cleanup, memory management, and reactive updates at specific component lifecycle moments.

**Sample:**

```ts
@Component({
  template: `<p>{{ data }}</p>`,
})
export class DataLoadComponent implements OnInit, OnDestroy {
  private subscription: any;
  data = "";

  ngOnInit() {
    // Load data when component initializes
    this.subscription = this.loadData().subscribe((result) => {
      this.data = result;
    });
  }

  ngOnDestroy() {
    // Prevent memory leaks
    this.subscription.unsubscribe();
  }

  loadData() {
    return of("Data loaded");
  }
}
```

---

### 99. When should a team focus on Lifecycle hooks?

**Answer:**

Focus on lifecycle hooks when managing subscriptions, loading data, responding to input changes, validating forms, or initializing complex components.

**Sample:**

```ts
@Component({
  selector: "app-form",
  template: `<input [formControl]="emailControl" />`,
})
export class FormComponent implements OnInit, OnDestroy {
  emailControl = new FormControl("");
  private subscription: any;

  ngOnInit() {
    this.subscription = this.emailControl.valueChanges.subscribe((email) => {
      console.log("Email changed to:", email);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
```

---

### 100. How is Lifecycle hooks applied in practice?

**Answer:**

Implement the lifecycle interface, add the corresponding hook method, perform required logic, and clean up resources to prevent memory leaks.

**Sample:**

```ts
import { OnInit, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";

@Component({})
export class FilterComponent implements OnInit, OnChanges, OnDestroy {
  @Input() filterTerm = "";

  ngOnInit() {
    console.log("Component initialized");
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["filterTerm"]) {
      console.log("Filter changed to:", changes["filterTerm"].currentValue);
    }
  }

  ngOnDestroy() {
    console.log("Component destroyed");
  }
}
```

---

### 101. What strengths does Lifecycle hooks bring?

**Answer:**

Hooks provide clear initialization points, enable selective updates via OnChanges, support proper cleanup via OnDestroy, and facilitate testing.

**Sample:**

```ts
@Component({
  template: `<video #videoElement></video>`,
})
export class VideoPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("videoElement") video: any;
  private player: any;

  ngOnInit() {
    console.log("Player component created");
  }

  ngAfterViewInit() {
    // Video element is now available
    this.player = this.initializePlayer();
  }

  ngOnDestroy() {
    this.player?.destroy();
  }

  private initializePlayer() {
    return {};
  }
}
```

---

### 102. What tradeoffs come with Lifecycle hooks?

**Answer:**

Too many hooks can complicate components, improper cleanup causes memory leaks, and relying heavily on lifecycle logic can reduce reusability.

**Sample:**

```ts
// BAD: Too many interdependent hooks
export class ComplexComponent
  implements
    OnInit,
    OnChanges,
    AfterViewInit,
    AfterContentInit,
    AfterViewChecked
{
  ngOnInit() {
    /* ... */
  }
  ngOnChanges() {
    /* ... */
  }
  ngAfterViewInit() {
    /* ... */
  }
  ngAfterContentInit() {
    /* ... */
  }
  ngAfterViewChecked() {
    /* ... */
  }
  // Hard to follow execution order and dependencies
}
```

---

### 103. How does Lifecycle hooks differ from Change detection?

**Answer:**

Lifecycle hooks provide specific moments for custom logic, while change detection is the mechanism that triggers component updates and re-renders.

**Sample:**

```ts
@Component({
  template: `<p>{{ counter }}</p>
    <button (click)="increment()">+</button>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent implements OnInit {
  counter = 0;

  ngOnInit() {
    console.log("Counter initialized");
  }

  increment() {
    this.counter++; // OnPush strategy only detects explicit changes
  }
}
```

---

### 104. What is a good real-world example of Lifecycle hooks?

**Answer:**

Data table with OnInit to load data, OnChanges to filter when sort column changes, AfterViewInit to initialize third-party plugin, OnDestroy to clean up.

**Sample:**

```ts
@Component({
  selector: "app-data-table",
  template: `<table #tableRef>
    <tr *ngFor="let row of data">
      <td>{{ row }}</td>
    </tr>
  </table>`,
})
export class DataTableComponent
  implements OnInit, OnChanges, AfterViewInit, OnDestroy
{
  @Input() dataSource: any[] = [];
  @ViewChild("tableRef") table: any;

  ngOnInit() {
    console.log("Table initializing");
  }
  ngOnChanges() {
    console.log("Data changed, re-filter");
  }
  ngAfterViewInit() {
    this.initializeDataTable();
  }
  ngOnDestroy() {
    this.destroyDataTable();
  }

  private initializeDataTable() {
    /* Setup third-party */
  }
  private destroyDataTable() {
    /* Cleanup */
  }
}
```

---

### 105. What is a best practice for Lifecycle hooks?

**Answer:**

Use OnInit for initialization, OnDestroy for cleanup, OnChanges for input tracking, rely on async pipe when possible, and keep hook logic focused.

**Sample:**

```ts
@Component({
  template: `<p>{{ (data$ | async)?.name }}</p>`,
})
export class BestPracticeComponent implements OnInit, OnDestroy {
  data$: Observable<any>;
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.data$ = this.loadData().pipe(takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData() {
    return of({ name: "User" });
  }
}
```

---

### 106. What is a common mistake around Lifecycle hooks?

**Answer:**

Forgetting to unsubscribe, performing heavy operations in hooks, accessing ViewChild before AfterViewInit, and creating memory leaks.

**Sample:**

```ts
// BAD: Memory leak from unsubscribed observable
export class BadComponent implements OnInit {
  ngOnInit() {
    this.data.subscribe((d) => (this.value = d)); // Never unsubscribed!
  }
}

// GOOD: Properly managed subscription
export class GoodComponent implements OnInit, OnDestroy {
  private sub: any;
  ngOnInit() {
    this.sub = this.data.subscribe((d) => (this.value = d));
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
```

---

### 107. How do you troubleshoot Lifecycle hooks-related issues?

**Answer:**

Check hook execution order in console logs, verify conditions in ngOnChanges, ensure ViewChild calls in AfterViewInit, and use Angular DevTools to inspect lifecycle.

**Sample:**

```ts
@Component({})
export class DebugComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() value = "";

  ngOnInit() {
    console.log("[OnInit] Component initialized at", new Date());
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("[OnChanges]", changes);
  }

  ngAfterViewInit() {
    console.log("[AfterViewInit] View fully initialized");
  }
}
```

---

### 108. How does Lifecycle hooks connect to the rest of Angular fundamentals?

**Answer:**

Hooks work with Services for data loading, use dependency injection for resources, respond to template changes via change detection, and support routing navigation.

**Sample:**

```ts
@Component({
  template: `<p>{{ title }}</p>`,
  providers: [DataService],
})
export class IntegrationComponent implements OnInit, OnDestroy {
  title = "";

  constructor(
    private data: DataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.data.getItem(params["id"]).subscribe((item) => {
        this.title = item.name;
      });
    });
  }

  ngOnDestroy() {
    /* cleanup */
  }
}
```

---

## 10. Change detection

### 109. What is the role of Change detection in Angular fundamentals?

**Answer:**

Change detection identifies when component state changes and updates the rendered UI accordingly, ensuring data-binding consistency throughout the application.

**Sample:**

```ts
@Component({
  selector: "app-counter",
  template: `
    <p>Count: {{ count }}</p>
    <button (click)="increment()">Increment</button>
  `,
})
export class CounterComponent {
  count = 0;

  increment() {
    this.count++; // Change detection runs to update template
  }
}
```

---

### 110. Why is the concept of Change detection important in Angular fundamentals?

**Answer:**

Change detection ensures UI stays synchronized with data, affects application performance, enables optimization strategies, and impacts rendering efficiency.

**Sample:**

```ts
@Component({
  selector: "app-list",
  template: `<div *ngFor="let item of items">{{ item.name }}</div>`,
  changeDetection: ChangeDetectionStrategy.Default, // Full change detection
})
export class ListComponent {
  items = [{ name: "Item 1" }, { name: "Item 2" }];

  addItem() {
    this.items.push({ name: "Item 3" }); // Change detection triggers
  }
}
```

---

### 111. When should a team focus on Change detection?

**Answer:**

Focus on change detection when optimizing performance, dealing with frequent updates, implementing OnPush strategy, or managing large lists and complex UIs.

**Sample:**

```ts
@Component({
  selector: "app-performance",
  template: `<p>{{ computeExpensiveValue() }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush, // Only check on input changes
})
export class PerformanceComponent {
  @Input() data: any;

  computeExpensiveValue() {
    // Only runs when explicitly triggered or on input change
    return this.data?.computed;
  }
}
```

---

### 112. How is Change detection applied in practice?

**Answer:**

Use Default strategy for most components, apply OnPush strategy for presentation components, manually call detectChanges when needed, or use immutable data patterns.

**Sample:**

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationComponent {
  @Input() item: any;

  constructor(private cdr: ChangeDetectorRef) {}

  updateUI() {
    // Manually trigger change detection if needed
    this.cdr.markForCheck();
  }
}

@Component({
  template: `<app-presentation [item]="data"></app-presentation>`,
})
export class ContainerComponent {
  data = { name: "Item" };
}
```

---

### 113. What strengths does Change detection bring?

**Answer:**

Automatic UI synchronization, enables performance optimization, supports both eager and manual strategies, works seamlessly with immutable patterns.

**Sample:**

```ts
@Component({
  selector: "app-grid",
  template: `<div *ngFor="let row of rows; trackBy: trackById">
    {{ row.name }}
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridComponent {
  @Input() rows: any[] = [];

  trackById(index: number, row: any) {
    return row.id; // Optimize rendering with trackBy
  }
}
```

---

### 114. What tradeoffs come with Change detection?

**Answer:**

Default strategy can hurt performance with large datasets, OnPush requires careful state management, manual detection can introduce bugs, and debugging is complex.

**Sample:**

```ts
// Default strategy: Checks every component on every event (slower)
@Component({
  template: `{{ heavyComputation() }}`, // Runs frequently!
  changeDetection: ChangeDetectionStrategy.Default,
})
export class SlowComponent {
  heavyComputation() {
    /* Expensive operation */ return 0;
  }
}

// OnPush strategy: Only checks when inputs change (faster)
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FastComponent {
  @Input() data: any;
}
```

---

### 115. How does Change detection differ from Angular framework overview?

**Answer:**

Change detection is the mechanism for updating the UI, while framework overview encompasses Angular's architectural design, components, and overall purpose.

**Sample:**

```ts
// Framework overview: Components, DI, Services
@Injectable({ providedIn: "root" })
export class AppService {}

@Component({
  selector: "app-root",
  template: `<p>{{ data }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush, // Change detection strategy
})
export class AppComponent {
  data = "Hello";
  constructor(public service: AppService) {}
}
```

---

### 116. What is a good real-world example of Change detection?

**Answer:**

Real-time dashboard with live metrics where OnPush strategy prevents unnecessary checks; high-frequency updates only recalculate when data actually changes.

**Sample:**

```ts
@Component({
  selector: "app-metric-card",
  template: `<div>{{ metric.value }}</div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetricCardComponent {
  @Input() metric: { value: number };
}

@Component({
  template: `
    <app-metric-card *ngFor="let m of metrics" [metric]="m"></app-metric-card>
  `,
})
export class DashboardComponent {
  metrics = [{ value: 10 }, { value: 20 }];
}
```

---

### 117. What is a best practice for Change detection?

**Answer:**

Use OnPush for presentational components, leverage immutable data, avoid side effects in getters/methods, use trackBy with ngFor, and profile before optimizing.

**Sample:**

```ts
@Component({
  selector: "app-user-list",
  template: `<div *ngFor="let user of users; trackBy: trackByUserId">
    {{ user.name }}
  </div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  @Input() users: any[] = [];

  trackByUserId(index: number, user: any): any {
    return user.id; // Efficient re-rendering
  }

  constructor(private cdr: ChangeDetectorRef) {}

  refresh() {
    this.cdr.markForCheck(); // Manual trigger if needed
  }
}
```

---

### 118. What is a common mistake around Change detection?

**Answer:**

Not using trackBy with large lists, mutating arrays instead of creating new ones with OnPush, excessive change detection runs, and debugging performance issues.

**Sample:**

```ts
// BAD: Mutating array with OnPush (no update)
export class BadListComponent {
  @Input() items: any[];

  ngOnInit() {
    this.items.push({ id: 4 }); // Won't trigger change detection
  }
}

// GOOD: Creating new array
export class GoodListComponent {
  @Input() items: any[];

  ngOnInit() {
    this.items = [...this.items, { id: 4 }]; // Triggers detection
  }
}
```

---

### 119. How do you troubleshoot Change detection-related issues?

**Answer:**

Enable change detection logging, check ChangeDetectorRef calls, verify OnPush input changes, use Angular DevTools to inspect component tree, and profile with Chrome DevTools.

**Sample:**

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DebugComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    console.log("Initial detection cycle");
    this.cdr.markForCheck();
    console.log("Marked for check");
  }
}

// Profile in Chrome DevTools: Performance > Record > Check change detection cycles
```

---

### 120. How does Change detection connect to the rest of Angular fundamentals?

**Answer:**

Change detection works with data binding to sync UI, integrates with lifecycle hooks for timing, uses services for data, and affects routing and component initialization.

**Sample:**

```ts
@Component({
  selector: "app-integration",
  template: `<p>{{ (data$ | async)?.value }}</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntegrationComponent implements OnInit {
  data$: Observable<any>;

  constructor(
    private service: DataService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.data$ = this.service.getData().pipe(
      tap(() => this.cdr.markForCheck()), // Manual detection if needed
    );
  }
}
```
