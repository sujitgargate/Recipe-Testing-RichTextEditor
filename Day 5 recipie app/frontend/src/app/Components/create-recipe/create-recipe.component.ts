import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Injectable, OnInit, Inject } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ToolbarService, LinkService, ImageService, HtmlEditorService, TableService, QuickToolbarService } from '@syncfusion/ej2-angular-richtexteditor';

export interface Ingredients {
  name: string;
}

@Component({
  selector: 'app-create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css'],
  providers: [ToolbarService, LinkService, ImageService, HtmlEditorService,TableService, QuickToolbarService],

})
export class CreateRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  uploadFiles;
  images;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredients: Ingredients[] = [];

  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private router: Router,
    public dialogRef: MatDialogRef<CreateRecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    //debugger;
    //console.log(this.data);
    if (this.data) {
      this.recipeForm = this.fb.group({
        _id: [this.data._id],
        name: [this.data.name, Validators.required],
        calories: [this.data.calories, Validators.required],
        description: [this.data.description, Validators.required],
        file: [this.data.imageUrl, Validators.required],
        recipeCreatedDate: [this.data.recipeCreatedDate, Validators.required],
        ingredient: [this.data.ingredients],
      });
    } else {
      this.recipeForm = this.fb.group({
        name: ['', Validators.required],
        calories: ['', Validators.required],
        description: ['', Validators.required],
        file: ['', Validators.required],
        recipeCreatedDate: ['', Validators.required],
        ingredient: [this.ingredients],
      });
    }
  }

  add(event: MatChipInputEvent): void {
    console.log('event>>>>>>>>' + event);

    debugger;
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.ingredients.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(ingredients: Ingredients): void {
    const index = this.ingredients.indexOf(ingredients);

    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  createRecipe() {
    this.recipeService
      .add(this.recipeForm.value, this.images)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['list']);
      });
  }

  updateRecipe() {
    this.recipeService
      .update(this.recipeForm.value, this.images)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['list']);
      });
  }
  deleteRecipe() {
    this.recipeService.delete(this.recipeForm.value._id).subscribe((res) => {
      console.log(res);
      this.router.navigate(['list']);
    });
  }
  fileChange(element) {
    const uploadFiles = element.target.files[0];
    this.images = uploadFiles;
  }

  public value: string = `
  <p>The RichTextEditor triggers events based on its actions. </p>
                      <p> The events can be used as an extension point to perform custom operations.</p>
                      <ul>
                          <li>created - Triggers when the component is rendered.</li>
                          <li>change - Triggers only when RTE is blurred and changes are done to the content.</li>
                          <li>focus - Triggers when RTE is focused in.</li>
                          <li>blur - Triggers when RTE is focused out.</li>
                          <li>actionBegin - Triggers before command execution using toolbar items or executeCommand method.</li>
                          <li>actionComplete - Triggers after command execution using toolbar items or executeCommand method.</li>
                          <li>destroyed – Triggers when the component is destroyed.</li>
                      </ul>`;
      public tools: object = {
          items: ['Undo', 'Redo', '|',
              'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
              'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
              'SubScript', 'SuperScript', '|',
              'LowerCase', 'UpperCase', '|',
              'Formats', 'Alignments', '|', 'OrderedList', 'UnorderedList', '|',
              'Indent', 'Outdent', '|', 'CreateLink','CreateTable',
              'Image', '|', 'ClearFormat', 'Print', 'SourceCode', '|', 'FullScreen']
      };
      public quickTools: object = {
          image: [
              'Replace', 'Align', 'Caption', 'Remove', 'InsertLink', '-', 'Display', 'AltText', 'Dimension']
      };

}
