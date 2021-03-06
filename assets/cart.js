// abc
class CartRemoveButton extends HTMLElement {
  constructor() {
    super();
    this.addEventListener('click', (event) => {
      event.preventDefault();
      this.closest('cart-items').updateQuantity(this.dataset.index, 0);
    });
  }
}

customElements.define('cart-remove-button', CartRemoveButton);

class CartItems extends HTMLElement {
  constructor() {
    super();

    this.lineItemStatusElement = document.getElementById('shopping-cart-line-item-status');

    this.currentItemCount = Array.from(this.querySelectorAll('[name="updates[]"]'))
      .reduce((total, quantityInput) => total + parseInt(quantityInput.value), 0);

    this.debouncedOnChange = debounce((event) => {
      this.onChange(event);
    }, 300);

    this.addEventListener('change', this.debouncedOnChange.bind(this));
  }

  onChange(event) {
    this.updateQuantity(event.target.dataset.index, event.target.value, document.activeElement.getAttribute('name'));
  }

  getSectionsToRender() {
    return [
      {
        id: 'main-cart-items',
        section: document.getElementById('main-cart-items').dataset.id,
        selector: '.js-contents',
      },
      {
        id: 'cart-icon-bubble',
        section: 'cart-icon-bubble',
        selector: '.shopify-section'
      },
      {
        id: 'cart-live-region-text',
        section: 'cart-live-region-text',
        selector: '.shopify-section'
      },
      {
        id: 'main-cart-footer',
        section: document.getElementById('main-cart-footer').dataset.id,
        selector: '.js-contents',
      }
    ];
  }

  updateQuantity(line, quantity, name) {
    this.enableLoading(line);

    const body = JSON.stringify({
      line,
      quantity,
      sections: this.getSectionsToRender().map((section) => section.section),
      sections_url: window.location.pathname
    });

    fetch(`${routes.cart_change_url}`, {...fetchConfig(), ...{ body }})
      .then((response) => {
        return response.text();
      })
      .then((state) => {
        const parsedState = JSON.parse(state);
        this.classList.toggle('is-empty', parsedState.item_count === 0);
        const cartFooter = document.getElementById('main-cart-footer');

        if (cartFooter) cartFooter.classList.toggle('is-empty', parsedState.item_count === 0);

        this.getSectionsToRender().forEach((section => {
          const elementToReplace =
            document.getElementById(section.id).querySelector(section.selector) || document.getElementById(section.id);

          elementToReplace.innerHTML =
            this.getSectionInnerHTML(parsedState.sections[section.section], section.selector);
        }));

        this.updateLiveRegions(line, parsedState.item_count);
        const lineItem =  document.getElementById(`CartItem-${line}`);
        if (lineItem) lineItem.querySelector(`[name="${name}"]`).focus();
        this.disableLoading();
      }).catch(() => {
        this.querySelectorAll('.loading-overlay').forEach((overlay) => overlay.classList.add('hidden'));
        document.getElementById('cart-errors').textContent = window.cartStrings.error;
        this.disableLoading();
      });
  }

  updateLiveRegions(line, itemCount) {
    if (this.currentItemCount === itemCount) {
      document.getElementById(`Line-item-error-${line}`)
        .querySelector('.cart-item__error-text')
        .innerHTML = window.cartStrings.quantityError.replace(
          '[quantity]',
          document.getElementById(`Quantity-${line}`).value
        );
    }

    this.currentItemCount = itemCount;
    this.lineItemStatusElement.setAttribute('aria-hidden', true);

    const cartStatus = document.getElementById('cart-live-region-text');
    cartStatus.setAttribute('aria-hidden', false);

    setTimeout(() => {
      cartStatus.setAttribute('aria-hidden', true);
    }, 1000);
  }

  getSectionInnerHTML(html, selector) {
    return new DOMParser()
      .parseFromString(html, 'text/html')
      .querySelector(selector).innerHTML;
  }

  enableLoading(line) {
    document.getElementById('main-cart-items').classList.add('cart__items--disabled');
    this.querySelectorAll(`#CartItem-${line} .loading-overlay`).forEach((overlay) => overlay.classList.remove('hidden'));
    document.activeElement.blur();
    this.lineItemStatusElement.setAttribute('aria-hidden', false);
  }

  disableLoading() {
    document.getElementById('main-cart-items').classList.remove('cart__items--disabled');
  }
}

customElements.define('cart-items', CartItems);

var test=1
var test=2
var test=3
var test=4
var test=5
var test=6
var test=1
var test=2
var test=3
var test=4
var test=5
var test=6
var test=7
var test=8
var test=1
var test=2
var test=3
var test=4
var test=5
var test=6
var test=7
var test=8
var test=9
var test=10
var test=11
var test=12
var test=13
var test=14
var test=15
var test=16
var test=17
var test=18
var test=19
var test=20
var test=21
var test=22
var test=23
var test=24
var test=25
var test=26
var test=27
var test=28
var test=29
var test=30
var test=31
var test=32
var test=33
var test=34
var test=35
var test=36
var test=37
var test=38
var test=39
var test=40
var test=41
var test=42
var test=43
var test=44
var test=45
var test=46
var test=47
var test=48
var test=49
var test=50
var test=51
var test=52
var test=53
var test=54
var test=55
var test=56
var test=57
var test=58
var test=59
var test=60
var test=61
var test=62
var test=63
var test=64
var test=65
var test=66
var test=67
var test=68
var test=69
var test=70
var test=71
var test=72
var test=73
var test=74
var test=75
var test=76
var test=77
var test=78
var test=79
var test=80
var test=81
var test=82
var test=83
var test=84
var test=85
var test=86
var test=87
var test=88
var test=89
var test=90
var test=91
var test=92
var test=93
var test=94
var test=95
var test=96
var test=97
var test=98
var test=99
var test=100
var test=101
var test=102
var test=103
var test=104
var test=105
var test=106
var test=107
var test=108
var test=109
var test=110
var test=111
var test=112
var test=113
var test=114
var test=115
var test=116
var test=117
var test=118
var test=119
var test=120
var test=121
var test=122
var test=123
var test=124
var test=125
var test=126
var test=127
var test=128
var test=129
var test=130
var test=131
var test=132
var test=133
var test=134
var test=135
var test=136
var test=137
var test=138
var test=139
var test=140
var test=141
var test=142
var test=143
var test=144
var test=145
var test=146
var test=147
var test=148
var test=149
var test=150
var test=151
var test=152
var test=153
var test=154
var test=155
var test=156
var test=157
var test=158
var test=159
var test=160
var test=161
var test=162
var test=163
var test=164
var test=165
var test=166
var test=167
var test=168
var test=169
var test=170
var test=171
var test=172
var test=173
var test=174
var test=175
var test=176
var test=177
var test=178
var test=179
var test=180
var test=181
var test=182
var test=183
var test=184
var test=185
var test=186
var test=187
var test=188
var test=189
var test=190
var test=191
var test=192
var test=193
var test=194
var test=195
var test=196
var test=197
var test=198
var test=199
var test=200
var test=201
var test=202
var test=203
var test=204
var test=205
var test=206
var test=207
var test=208
var test=209
var test=210
var test=211
var test=212
var test=213
var test=214
var test=215
var test=216
var test=217
var test=218
var test=219
var test=220
var test=221
var test=222
var test=223
var test=224
var test=225
var test=226
var test=227
var test=228
var test=229
var test=230
var test=231
var test=232
var test=233
var test=234
var test=235
var test=236
var test=237
var test=238
var test=239
var test=240
var test=241
var test=242
var test=243
var test=244
var test=245
var test=246
var test=247
var test=248
var test=249
var test=250
var test=251
var test=252
var test=253
var test=254
var test=255
var test=256
var test=257
var test=258
var test=259
var test=260
var test=261
var test=262
var test=263
var test=264
var test=265
var test=266
var test=267
var test=268
var test=269
var test=270
var test=271
var test=272
var test=273
var test=274
var test=275
var test=276
var test=277
var test=278
var test=279
var test=280
var test=281
var test=282
var test=283
var test=284
var test=285
var test=286
var test=287
var test=288
var test=289
var test=290
var test=291
var test=292
var test=293
var test=294
var test=295
var test=296
var test=297
var test=298
var test=299
var test=300
var test=301
var test=302
var test=303
var test=304
var test=305
var test=306
var test=307
var test=308
var test=309
var test=310
var test=311
var test=312
var test=313
var test=314
var test=315
var test=316
var test=317
var test=318
var test=319
var test=320
var test=321
var test=322
var test=323
var test=324
var test=325
var test=326
var test=327
var test=328
var test=329
var test=330
var test=331
var test=332
var test=333
var test=334
var test=335
var test=336
var test=337
var test=338
var test=339
var test=340
var test=341
var test=342
var test=343
var test=344
var test=345
var test=346
var test=347
var test=348
var test=349
var test=350
var test=351
var test=352
var test=353
var test=354
var test=355
var test=356
var test=357
var test=358
var test=359
var test=360
var test=361
var test=362
var test=363
var test=364
var test=365
var test=366
var test=367
var test=368
var test=369
var test=370
var test=371
var test=372
var test=373
var test=374
var test=375
var test=376
var test=377
var test=378
var test=379
var test=380
var test=381
var test=382
var test=383
var test=384
var test=385
var test=386
var test=387
var test=388
var test=389
var test=390
var test=391
var test=392
var test=393
var test=394
var test=395
var test=396
var test=397
var test=398
var test=399
var test=400
var test=401
var test=402
var test=403
var test=404
var test=405
var test=406
var test=407
var test=408
var test=409
var test=410
var test=411
var test=412
var test=413
var test=414
var test=415
var test=416
var test=417
var test=418
var test=419
var test=420
var test=421
var test=422
var test=423
var test=424
var test=425
var test=426
var test=427
var test=428
var test=429
var test=430
var test=431
var test=432
var test=433
var test=434
var test=435
var test=436
var test=437
var test=438
var test=439
var test=440
var test=441
var test=442
var test=443
var test=444
var test=445
var test=446
var test=447
var test=448
var test=449
var test=450
var test=451
var test=452
var test=453
var test=454
var test=455
var test=456
var test=457
var test=458
var test=459
var test=460
var test=461
var test=462
var test=463
var test=464
var test=465
var test=466
var test=467
var test=468
var test=469
var test=470
var test=471
var test=472
var test=473
var test=474
var test=475
var test=476
var test=477
var test=478
var test=479
var test=480
var test=481
var test=482
var test=483
var test=484
var test=485
var test=486
var test=487
var test=488
var test=489
var test=490
var test=491
var test=492
var test=493
var test=494
var test=495
var test=496
var test=497
var test=498
var test=499
var test=500
var test=501
var test=502
var test=503
var test=504
var test=505
var test=506
var test=507
var test=508
var test=509
var test=510
var test=511
var test=512
var test=513
var test=514
var test=515
var test=516
var test=517
var test=518
var test=519
var test=520
var test=521
var test=522
var test=523
var test=524
var test=525
var test=526
var test=527
var test=528
var test=529
var test=530
var test=531
var test=532
var test=533
var test=534
var test=535
var test=536
var test=537
var test=538
var test=539
var test=540
var test=541
var test=542
var test=543
var test=544
var test=545
var test=546
var test=547
var test=548
var test=549
var test=550
var test=551
var test=552
var test=553
var test=554
var test=555
var test=556
var test=557
var test=558
var test=559
var test=560
var test=561
var test=562
var test=563
var test=564
var test=565
var test=566
var test=567
var test=568
var test=569
var test=570
var test=571
var test=572
var test=573
var test=574
var test=575
var test=576
var test=577
var test=578
var test=579
var test=580
var test=581
var test=582
var test=583
var test=584
var test=585
var test=586
var test=587
var test=588
var test=589
var test=590
var test=591
var test=592
var test=593
var test=594
var test=595
var test=596
var test=597
var test=598
var test=599
var test=600
var test=601
var test=602
var test=603
