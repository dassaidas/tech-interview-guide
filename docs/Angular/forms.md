# Angular Forms Interview Questions

![Angular Form Flow](../assets/angular-form-flow.png)

## 1. What are the two types of forms in Angular?
**Answer:**  
- Template-driven forms: Use Angular directives in HTML.
- Reactive forms: Use FormControl and FormGroup in TypeScript.

**Reactive Form Sample:**
```ts
this.loginForm = this.fb.group({
  username: ['', Validators.required],
  password: ['', Validators.required]
});
```