import { Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef } from '@angular/core';
import { StringHelpersService } from '../services/string-helpers.service/string-helpers.service';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'la-recolte-modal-select',
  templateUrl: './la-recolte-modal-select.component.html',
  styleUrls: ['./la-recolte-modal-select.component.scss']
})
export class LaRecolteModalSelectComponent implements OnInit {

  private _loading = false;
  private _isOpened = false;
  private _search = '';
  private _items: any[];

  public allItems: any[];

  public get search() {
    return this._search;
  };
  public set search(value) {
    this.filterBySearch(value);

    this._search = value;
  }

  constructor(private stringHelpersService: StringHelpersService) { }

  ngOnInit() { }

  @Output() readonly confirm = new EventEmitter<any>();
  @Output() readonly closeEvt = new EventEmitter();

  @Output() readonly isOpenedChange = new EventEmitter();

  @Input() title: string;
  @Input() multiselect: boolean = false;
  @Input() idProperty: string = 'id';
  @Input() get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    if (this._loading && !value) {
      this.focusOnSearch();
    }
    this._loading = value;
  }
  @Input() get items(): any[] {
    return this._items;
  }
  set items(value: any[]) {
    if (value) {
      this.allItems = this.stringHelpersService.sort(value, (v: any) => v.name);
      this._items = value.slice(0, 100);
      timer().pipe(take(1)).subscribe(_ => this.handleHeightOnStart())
    }
  }
  @Input() get isOpened(): boolean {
    return this._isOpened;
  }
  set isOpened(value: boolean) {
    this._isOpened = value;
    this.isOpenedChange.emit(this._isOpened);
    if (value) {
      if (this.search) { this.filterBySearch(this.search); }
      this.focusOnSearch();
    } else {
      this.allItems && this.allItems.forEach(i => delete i.selected);
    }
  }

  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  @ViewChild('modalCard', { static: false }) modalCard: ElementRef;

  private focusOnSearch(): void {
    timer().pipe(take(1)).subscribe(_ => this.searchInput && this.searchInput.nativeElement && this.searchInput.nativeElement.focus())
  }

  private handleHeightOnStart() {
    if (!this.modalCard) return;
    const cardEl = this.modalCard.nativeElement;
    const height = cardEl.getBoundingClientRect().height;
    cardEl.style.height = `${height}px`;
  }

  closeModal() {
    this.closeEvt.emit();
    this.isOpened = false;
  }

  getSelectedItems(): any[] {
    return (this.allItems || []).filter(i => i.selected);
  }

  onItemSelect(item: any) {
    if (this.multiselect) {
      item.selected = !item.selected;
    } else {
      this.onConfirm(item);
    }
  }

  onConfirmClick() {
    this.onConfirm(this.getSelectedItems());
  }

  private onConfirm(value: any) {
    this.confirm.emit(value);
    this.search = '';
    this.isOpened = false;
  }

  trackByItemFn(index: number, item: any) {
    return item._id;
  }

  private filterBySearch(value: any): void {
    this._items = this.stringHelpersService.search(this.allItems, value, (v: any) => v.name);

    if (this._items.length > 100) {
      this._items = this._items.slice(0, 100);
    }
  }
}
