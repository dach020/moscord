import { Component, OnInit } from '@angular/core';
import { FeedsService } from 'src/app/core/services';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';
import { map } from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'home',
  templateUrl: 'home.component.pug',
  styleUrls: ['home.component.styl']
})

export class HomeComponent implements OnInit {
  public sources: any = null;
  public articles: any = null;
  public default: string = '../../../../assets/default.png';
  public totalPages: number = null;
  public currentPage: number = 1;
  public isLoading = false;
  public selectedSource: any = null;
  public snackbar: any = null;
  constructor(private feedsService: FeedsService,
              private matSnackbar: MatSnackBar) { }

  public async ngOnInit() {
    await this.loadSources();
  }

  public async onSelectSource(data: any) {
    this.selectedSource = data;
    this.currentPage = 1;
    await this.loadArticles();
  }

  public async onNavigatePage(command: string) {
    if (command === 'inc') {
      if (((this.currentPage * 10) + 1) < this.totalPages ) {
        this.currentPage += 1;
      }
    } else {
      if ((this.currentPage - 1) > 0) {
        this.currentPage -= 1;
      }
    }
    await this.loadArticles();
  }

  public async loadSources() {
    try {
      this.isLoading = true;
      const result = await this.feedsService.getSources();
      this.sources = result.sources;
      this.isLoading = false;
    } catch (err) {
      this.isLoading = false;
    }
  }

  public async loadArticles() {
    try {
      this.isLoading = true;
      const result = await this.feedsService.getBySource({ sources: this.selectedSource.id, page: this.currentPage });
      this.articles = result.articles;
      this.totalPages = result.totalResults;
      this.articles = map(this.articles, (item) => {
        item.urlToImage = !item.urlToImage || item.urlToImage === 'null' ? this.default : item.urlToImage;
        return item;
      });
      this.isLoading = false;
    } catch (err) {
      this.openSnackBar('Server error. Please try again.', async () => {
        await this.loadArticles();
      });
    }
  }

  public openSnackBar(message: string, callback?: any ) {
    this.snackbar = this.matSnackbar.open(message, 'Refresh', {
        duration: 20000
    });

    this.snackbar.onAction().subscribe(() => {
      callback();
      this.snackbar.dismiss();
    });
  }

  public formatDate(date: string) {
    return moment(date).format('LLL');
  }
}
