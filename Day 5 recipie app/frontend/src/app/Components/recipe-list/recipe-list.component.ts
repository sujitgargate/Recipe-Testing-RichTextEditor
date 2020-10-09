import { Component, OnInit, ViewChild } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRecipeComponent } from '../create-recipe/create-recipe.component';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: any;
  dataSource: Object;
  search: string;
  displayedColumns: string[] = [
    'name',
    'image',
    'description',
    'calories',
    'recipeCreatedDate',
  ];

  constructor(private recipeService: RecipeService, public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateRecipeComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogForEdit(id: any) {
    console.log('testid', id);

    this.recipeService.getById(id).subscribe((res) => {
      console.log(res);
      this.data = res;
      console.log(this.data);

      const dialogRef = this.dialog.open(CreateRecipeComponent, {
        data: this.data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
      });
    });
  }

  searchByName() {
    if (this.search == '') {
      return this.getList();
    }
    var searchModel = {
      name: this.search,
    };
    this.recipeService.search(searchModel).subscribe((res) => {
      this.dataSource = [res];
      console.log([res]);
    });
  }

  getList() {
    this.recipeService.get().subscribe((res) => {
      this.dataSource = res;
    });
  }

  ngOnInit(): void {
    this.getList();
  }


}
