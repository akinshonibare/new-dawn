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
