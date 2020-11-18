import React from 'react'
import cn from 'classnames'
import { useSession } from 'next-auth/client'

import css from './styles.module.scss'

{
  /* 
  tax label
{
  "de":"none"
  "eu":"VAT number"
  "us":"Tax ID number"
} 
*/
}
const Invoice = ({
  number,
  date,
  dueDate,
  recipient,
  address1,
  address2,
  country,
  taxNumber,
  invoiceItems = [],
}) => {
  const [session] = useSession()

  const subtotal = invoiceItems.reduce(
    (sum, { rate, quantity }) => sum + rate * quantity,
    0
  )
  const tax = { amount: 0 }
  const formatter = new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
  })

  switch (country) {
    case 'de':
      tax.amountLabel = 'VAT (19%)'
      tax.amount = (subtotal / 100) * 19
      break

    case 'us':
      tax.numberLabel = 'Tax ID number'
      tax.amountLabel = 'VAT reverse charged'
      tax.amount = 0
      break

    default:
      tax.numberLabel = 'VAT number'
      tax.amountLabel = 'VAT reverse charged'
      tax.amount = 0
      break
  }

  const total = formatter.format(subtotal + tax.amount)

  // do not show invoice if not logged in
  return session ? (
    <article className={cn('page', css.wrap)}>
      <div className={css.subpage}>
        <header className={cn(css.header, css.twoColumn)}>
          <div>
            <h2>
              <a href="https://jonasvail.com">Jonas Vail</a>
            </h2>
            <p>Brand and Advertising Strategy Consultant</p>
          </div>
          <div>
            <h1>Invoice</h1>
            <dl>
              <div className={css.listItem}>
                <dt className={css.listTitle}>Invoice №:</dt>
                <dd className={css.listDescription}>{number}</dd>
              </div>
              <div className={css.listItem}>
                <dt className={css.listTitle}>Date:</dt>
                <dd className={css.listDescription}>{date}</dd>
              </div>
              <div className={css.listItem}>
                <dt className={css.listTitle}>Payment due:</dt>
                <dd className={css.listDescription}>{dueDate}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section className={cn(css.section, css.twoColumn)}>
          <div className={css.recipient}>
            <h6>Recipient</h6>
            <div>
              <strong>{recipient}</strong>
              <br />
              {address1}
              {address2 && (
                <>
                  <br />
                  {address2}
                </>
              )}
              <br />
              {taxNumber && `${tax.numberLabel}: ${taxNumber}`}
            </div>
          </div>
          <div className={'hhh'}>
            <h6>Total due</h6>
            <h4>{total}</h4>
          </div>
        </section>
        <section className={css.section}>
          <table className={css.table}>
            <thead>
              <tr>
                <th className={css.description}>Description of services</th>
                <th className={css.rate}>Day rate</th>
                <th className={css.quantity}>Days</th>
                <th className={css.total}>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceItems.map(({ description, rate, quantity }) => (
                <tr key={description}>
                  <td>{description}</td>
                  <td>€{rate}</td>
                  <td>{quantity}</td>
                  <td>{formatter.format(rate * quantity)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td colSpan="2">
                  <div className={css.calcItem}>Subtotal</div>
                  <div className={css.calcItem}>{tax.amountLabel}</div>
                </td>
                <td>
                  <div className={css.calcItem}>
                    {formatter.format(subtotal)}
                  </div>
                  <div className={css.calcItem}>
                    {formatter.format(tax.amount)}
                  </div>
                </td>
              </tr>
              <tr>
                <td></td>
                <td className={css.totalColumn}>Total</td>
                <td className={css.totalColumn}></td>
                <td className={css.totalColumn}>{total}</td>
              </tr>
            </tfoot>
          </table>
        </section>
        <section className={cn(css.section, css.twoColumn)}>
          <div>
            <h6>Payment details</h6>
            <dl>
              <div className={css.listItem}>
                <dt className={css.listTitle}>Account name:</dt>
                <dd className={css.listDescription}>Jonas Vail</dd>
              </div>
              <div className={css.listItem}>
                <dt className={css.listTitle}>IBAN:</dt>
                <dd className={css.listDescription}>
                  DE05 1001 1001 2624 2809 86
                </dd>
              </div>
              <div className={css.listItem}>
                <dt className={css.listTitle}>BIC:</dt>
                <dd className={css.listDescription}>NTSBDEB1XXX</dd>
              </div>
              <div className={css.listItem}>
                <dt className={css.listTitle}>Reference:</dt>
                <dd className={css.listDescription}>{number}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h6>Contact info</h6>
            Danziger Straße 73
            <br />
            10405 Berlin
            <br />
            Germany
            <br />
            <a href="mailto:hello@jonasvail.com">hello@jonasvail.com</a>
          </div>
        </section>
        <section className={cn(css.section, css.twoColumn)}>
          <div></div>
          <div>
            <small>
              VAT no: DE325311319
              <br />
              Tax ID: 31/569/03703
            </small>
          </div>
        </section>
      </div>
    </article>
  ) : null
}

export default Invoice
