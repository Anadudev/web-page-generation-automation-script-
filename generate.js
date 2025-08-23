let index = 84;
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Modality } from "@google/genai";
import { randomUUID } from "crypto";
import * as cheerio from "cheerio";

const __filename = fileURLToPath( import.meta.url );
const __dirname = dirname( __filename );

// ------ gemini ------ //
const apiKey = "AIzaSyByjZrANZ_Jf-iGyn360z5joUhtQQ3Uc1w";

const ai = new GoogleGenAI( { apiKey } );

/**
 * A list of common English stop words. These words are often removed from SEO slugs
 * as they add little value and can make the URL unnecessarily long.
 * @type {string[]}
 */
const stopWords = [
	"a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in",
	"into", "is", "it", "no", "not", "of", "on", "or", "such", "that", "the",
	"their", "then", "there", "these", "they", "this", "to", "was", "with"
];

const cutBeforeAnswer = ( title ) => {
	const questionMarkIndex = title.indexOf( "?" );

	return questionMarkIndex !== -1 ? title.substring( 0, questionMarkIndex ) : title;
};

const toSeoSlug = ( title, maxLength = 60 ) => {
	if ( !title || typeof title !== "string" )
	{
		console.error( "Input must be a non-empty string." );
		return "";
	}

	// Handle question marks by cutting the string at the first instance
	title = cutBeforeAnswer( title );

	// 1. Convert the title to lowercase and split into words
	let slugWords = title.toLowerCase().split( /\s+/ );

	// 2. Filter out stop words
	slugWords = slugWords.filter( word => !stopWords.includes( word ) );

	// 3. Join the words with hyphens
	let slug = slugWords.join( "-" );

	// 4. Remove any remaining characters that are not a-z, 0-9, or hyphens
	slug = slug.replace( /[^a-z0-9-]/g, "" );

	// 5. Replace multiple consecutive hyphens with a single hyphen
	slug = slug.replace( /-{2,}/g, "-" );

	// 6. Trim any leading or trailing hyphens
	slug = slug.replace( /^-+|-+$/g, "" );

	// 7. Truncate the slug if it exceeds the maximum length
	if ( slug.length > maxLength )
	{
		let truncatedSlug = "";
		const words = slug.split( "-" );
		for ( let i = 0; i < words.length; i++ )
		{
			if ( ( truncatedSlug + "-" + words[ i ] ).length <= maxLength )
			{
				if ( truncatedSlug !== "" )
				{
					truncatedSlug += "-";
				}
				truncatedSlug += words[ i ];
			} else
			{
				break;
			}
		}
		slug = truncatedSlug;
	}

	return slug;
};


const structure = {
	title: `<title>Small Business Loans | Borrow up to £1M</title>`,
	metaDescriptions: `<meta
      content="Small business loans between £1,000 and £1 million. No early repayment fees. Loan terms between 1 day and 5 years. Dedicated account manager."
      name="description"
    />
    <meta
      content="Small Business Loans | Borrow up to £1M"
      property="og:title"
    />
    <meta
      content="Small business loans between £1,000 and £1 million. No early repayment fees. Loan terms between 1 day and 5 years. Dedicated account manager."
      property="og:description"
    />
    <meta
      content="Small Business Loans | Borrow up to £1M"
      property="twitter:title"
    />
    <meta
      content="Small business loans between £1,000 and £1 million. No early repayment fees. Loan terms between 1 day and 5 years. Dedicated account manager."
      property="twitter:description"
    />`,
	hero: `<div class="main-hero-grid">
	      <div
		class="hero-text hero-text__left"
		id="w-node-_26cd6d15-5753-9332-d0d6-3121a1751cfe-cfae7a12"
	      >
		<h1 class="heading-1 hero-title" id="hero-title">
		  Empower your business with fast, flexible funding
		</h1>
		<p class="large-text">
		  Access <span class="loan-size-min">£1,000</span>  to <span class="loan-size-max">£1 million</span> for your business needs. Use your
		  funds to invest in growth, manage cash flow, or seize new
		  opportunities—with simple, transparent repayments.
		</p>
		<ul class="green-checklist hero-list" role="list">
		  <li class="green-checklist__item">Clear pricing</li>
		  <li class="green-checklist__item">Price guarantee</li>
		  <li class="green-checklist__item">Call-back within 1 hour</li>
		</ul>
		<div class="buttons-wrap cta-buttons">
		  <a
		    class="btn apply-btn main-btn wide-margin wide-padding mobile-no-margin w-button"
		    data-ga-id="hero_cta__cta"
		    href="https://marketplace.contigocf.com/journey"
		    style="margin-bottom: 10px"
		    >Apply now</a
		  ><a
		    class="btn apply-btn main-btn secondary-cta narrow-padding w-button"
		    data-ga-id="hero_cta__cta"
		    href="https://marketplace.contigocf.com/journey"
		    >See how much you could get</a
		  >
		  <p
		    class="x-small-text left-margin"
		    id="w-node-_26cd6d15-5753-9332-d0d6-3121a1751d11-cfae7a12"
		  >
		    Applying won't affect your credit score
		  </p>
		</div>
	      </div>
	      <div
		class="hero-media hide-mobile"
		id="w-node-_26cd6d15-5753-9332-d0d6-3121a1751d13-cfae7a12"
	      >
		<div class="bg-shape hero-image-right">
		  <img
		    alt="wedge coral Contigo"
		    class="full-width _80--width hide-mobile"
		    loading="lazy"
		    src="../small-business-loans_files/62b09f4c57c6eacad1243b7e_Wedge_coral-6.svg"
		    width="Auto"
		  />
		</div>
		<div class="hero-image-wrap hero-media__right">
		  <img
		    alt="Smiling business owner"
		    class="hero-image hide-mobile"
		    loading="lazy"
		    sizes="(max-width: 940px) 100vw, 940px"
		    src="../reusables/images/small-business-loans/hero2.avif"
		    srcset="../reusables/images/small-business-loans/hero2.avif"
		    style="border-radius: 50%"
		  />
		</div>
		<p class="x-small-text hero-xs-text"></p>
	      </div>
	    </div>`,
	howItWorks: `<div
		class="text-panel"
		id="w-node-e1e5eca5-386d-e301-0604-a6b7f4cf3499-cfae7a12"
	      >
		<h2 class="text-panel__heading">How do business loans work?</h2>
		<div class="text-panel__rich-text w-richtext">
		  <p>
		    Business loans are designed to be fast, flexible, and
		    affordable—tailored to your needs, whether you’re looking
		    for working capital, equipment, or to manage cash flow.
		  </p>
		  <ul role="list">
		    <li>
		      <strong>Apply online in 60 seconds:</strong> Complete a
		      simple form or call a specialist—no paperwork required.
		    </li>
		    <li>
		      <strong>Get matched instantly:</strong> We compare offers
		      from our trusted lenders and present your best options.
		    </li>
		    <li>
		      <strong>Accept & get funded:</strong> Choose your offer
		      and receive funds in as little as 4 hours. Repay flexibly,
		      with no hidden fees.
		    </li>
		  </ul>
		  <p>
		    There’s no impact on your credit score to check your
		    options, and our dedicated loan specialists are here to
		    guide you every step of the way. Enjoy clear pricing, a best
		    price guarantee, and a call-back within 1 hour.
		  </p>
		</div>
	      </div>`,
	whatKindOfLoansAreAvailable: `<div
		class="accordion-container"
		id="w-node-_4984aeb8-158f-1754-adda-d4d7d62176ac-cfae7a12"
	      >
		<div class="bg-shape accordion-bg">
		  <img
		    alt="line arc"
		    loading="lazy"
		    src="../small-business-loans_files/62bd8dc400da51be7cfef695_line-arc.svg"
		  />
		</div>
		<div class="title-block tac">
		  <h2>
		    <strong>What kind of business loans are available?</strong>
		  </h2>
		  <p>
		    Choosing the right kind of business loan will depend on how
		    much you want to borrow, how long for and what you’re
		    planning to use it for. Contigo offers a range of business
		    loans, including
		    <a href="#">large business loans</a>
		    up to <span class="loan-size-max">£1 million</span>.
		  </p>
		</div>
		<div class="accordion-wrap">
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3
			class="accordion-question__heading large-text"
			data-ga-id="wantToKnowMore__question"
		      >
			<strong>Term Loans</strong>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			  <a href="#">Term loans</a>
			  are business loans with a fixed repayment schedule and
			  a predetermined end date. These tend to be
			  <a href="#">long term business loans</a>, and are best
			  suited for projects where you’re confident in your
			  ability to meet the payments every month.<br />
			</p>
		      </div>
		    </div>
		  </div>
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			  >Short-Term Loans</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			  As you would expect, short term business loans are
			  designed for immediate needs. ‘Short term’ in this
			  scenario means they have a term of a year or less and
			  are quick to fund. One important thing to consider is
			  that interest rates for short term business loans will
			  usually be higher, as you’re likely to pay more for
			  the speed and flexibility of the product.<br />
			</p>
		      </div>
		    </div>
		  </div>
		</div>
	      </div>`,
	loanCalculator: `<div class="padding-vertical">
	    <div class="title-element-grid-2">
	      <div
		class="title-element__wrap-2"
		id="w-node-a77f2f3f-1b2b-439b-c72f-3d91fa85fcd8-cfae7a12"
	      >
		<h2
		  class="title-element__heading-2 title-underline underline-red"
		  id="w-node-a77f2f3f-1b2b-439b-c72f-3d91fa85fcd9-cfae7a12"
		>
		  Business loan calculator
		</h2>
		<p class="after-underline mb-0 para-mw-700">
		  Use our
		  <a href="https://marketplace.contigocf.com/journey"
		    >business loan calculator</a
		  >
		  to quickly estimate your repayments, based on an example 3.33%
		  monthly interest rate. On an actual application, you could get
		  a rate as low as 2% per month, depending on your business. You
		  can repay your loan anytime with no early repayment fees to
		  save on interest.
		</p>
	      </div>
	    </div>
	    <div class="calculator-wrapper">
	      <img
		alt=""
		class="calculator-shape2"
		loading="lazy"
		src="../small-business-loans_files/6340453d76c497f0ce394841_dark-blue-donut.svg"
	      /><img
		alt=""
		class="calculator-shape1"
		loading="lazy"
		src="../small-business-loans_files/6340453d76c4971c81394844_light-blue-circle.svg"
	      />
	      <div class="calculator-box">
		<h3 class="heading-boxed">
		  <span class="months" id="months-text">30</span> monthly
		  repayments of <span class="blue-text">£</span
		  ><span class="blue-text" id="monthly-payments">25,613</span>
		</h3>
		<p class="calculator-helper-text">
		  Total repayment of £<span
		    class="repayment-text"
		    id="total-repayment"
		    >307,354</span
		  ><span class="blue-text-2 repayment-interest"
		    >(3.33% interest rate per 30 days)</span
		  >
		</p>
		<div class="calculator">
		  <div class="range-wrap">
		    <div class="w-embed">
		      <label class="hide-text" for="amount">Loan Amount</label>
		      <input
			class="range"
			id="amount"
			max="1000000"
			min="1000"
			name="amount"
			step="1000"
			type="range"
			value="500000"
		      />
		      <output
			class="tooltip amount-tooltip"
			style="left: calc(49.9499% + 0.507508px)"
			>£500,000
		      </output>
		    </div>
		  </div>
		  <div class="calculator-helper-text">
		    Borrow up to &nbsp;<span class="loan-size-max"> £1,000,000</span>
		  </div>
		  <div class="range-wrap red-range-wrap">
		    <div class="w-embed">
		      <label class="hide-text" for="months">Months</label>
		      <input
			class="range red-range"
			id="months"
			max="60"
			min="1"
			name="months"
			step="1"
			type="range"
			value="30"
		      />
		      <output
			class="tooltip month-tooltip"
			style="left: calc(47.8261% + 0.826087px)"
			>60 months
		      </output>
		    </div>
		  </div>
		  <div class="calculator-helper-text">For up to 60 months</div>
		</div>
		<div class="calculator-ctas">
		  <div
		    class="help-link contact-popup"
		    id="need-help-call-us-btn-calculator"
		  >
		    <a href="tel:02037780274">Need help? call us</a>
		  </div>
		  <a
		    class="btn borrow-btn hover-btn apply-inline w-button"
		    data-ga-id="calculator_cta__cta"
		    href="https://marketplace.contigocf.com/journey"
		    id="borrow-btn"
		    >Borrow £<span
		      data-ga-id="calculator_cta__cta"
		      id="button-value"
		      >250,000</span
		    ></a
		  >
		</div>
	      </div>
	    </div>
	    <p class="small-text para-mw-570 tac">
	      This loan calculator is only an example, your actual rate will
	      vary based on your circumstances. Here’s another example: if you
	      borrowed £10,000 for 60 months at 49% representative APR, with an
	      interest rate of 40% p.a. (variable), then, all in all, the total
	      amount you’d repay would be £12,294.
	    </p>
	    <img
	      alt=""
	      class="calc-shape"
	      loading="lazy"
	      src="../small-business-loans_files/6340453d76c4976134394842_arch-with-square.svg"
	    />
	  </div>`,
	howToApply: `<div class="container">
	  <div class="title-element__wrap-2" id="w-node-_275f8edb-a386-9547-020e-77249364f858-cfae7a12">
	    <h2 class="title-element__heading-2 title-underline underline-red"
	      id="w-node-_275f8edb-a386-9547-020e-77249364f859-cfae7a12">
	      <strong>How to apply for a business loan?</strong>
	    </h2>
	  </div>
	  <div class="padding-vertical">
	    <div class="">
	      <div
		class="list-section__img no-quote"
		id="w-node-_0e23a304-9397-1ff9-39b9-90132a35de36-cfae7a12"
		style="display:flex; justify-content: center;"
	      >
		<img
		  alt="offer stage Contigo"
		  class="full-width"
		  loading="lazy"
		  style="max-width: 300px"
		  src="../small-business-loans_files/648198a51e583cd05d495a59_Borrow-from-1-day-upto-5-years.svg"
		/>
	      </div>
	      <div
		class="list-section__content"
		id="w-node-_0e23a304-9397-1ff9-39b9-90132a35de38-cfae7a12"
	      >
		<ol class="numbered-list w-list-unstyled" role="list">
		  <li class="numbered-list__item">
		    <h3 class="mb-0-5">Apply in minutes</h3>
		    <p class="mb-0">
		      It takes five minutes from start to apply for a business loan. We're designed with small businesses in
		      mind, so we'll just need the basics about your business to
		      match you with the right lenders.
		    </p>
		  </li>
		  <li class="numbered-list__item">
		    <h3 class="mb-0-5">Use your funds</h3>
		    <p class="mb-0">
		      You'll be approved based on your business performance. You can then transfer as much as you need to your bank account, and the funds will typically be in your account in hours.
		    </p>
		  </li>
		  <li class="numbered-list__item">
		    <h3 class="mb-0-5">Repay or top up</h3>
		    <p class="mb-0">
		     Some loans come with no early repayment fees, allowing clients to repay at any time. Top-ups may also be available when additional capital is needed. These features are subject to lender approval and may vary based on the individual agreement. As the business grows, credit limits may increase accordingly.
		    </p>
		  </li>
		</ol>
		<div class="">
		  <a
		    class="btn apply-btn coral-btn blue-btn w-button"
		    data-ga-id="how_it_works_cta__cta"
		    href="https://marketplace.contigocf.com/journey"
		    >Apply now</a
		  >
		  <p class="x-small-text mb-0">
		    Applying won't affect your credit score
		  </p>
		</div>
	      </div>
	    </div>
	  </div>
	</div>`,
	eligibility: ` <div
		class="text-panel"
		id="w-node-_8a3a1d35-762b-40e3-001d-cfa1e5d8a02e-cfae7a12"
	      >
		<h2 class="text-panel__heading">
		  <strong>Business loan eligibility criteria</strong>
		</h2>
		<div class="text-panel__rich-text w-richtext">
		  <p>
		    To qualify for a business loan, your business should meet
		    the following criteria:
		  </p>
		  <ul role="list">
		    <li class="list-item-2">
		      <strong>Trading history:</strong> Your business should
		      have been trading for at least 6 months.
		    </li>
		    <li class="list-item-2">
		      <strong>Annual revenue:</strong> Minimum £50,000 annual
		      turnover.
		    </li>
		    <li class="list-item-2">
		      <strong>Loan amount:</strong> Looking to borrow between
		      £5,000 and <span class="loan-size-max">£1,000,000</span>.
		    </li>
		    <li class="list-item-2">
		      <strong>UK-based:</strong> Your business must be
		      registered and operating in the UK.
		    </li>
		  </ul>
		  <p>
		    We work with a wide network of specialist lenders to help
		    you access the best funding options. There’s no impact on
		    your credit score to check your eligibility, and our team is
		    here to support you every step of the way.
		  </p>
		</div>
	      </div>`,
	advantages: `<div
		class="text-panel"
		id="w-node-_9dc78582-0109-6cfb-5864-8cd34a099f27-cfae7a12"
	      >
		<h2 class="text-panel__heading">
		  <strong>Advantages of using business loans</strong>
		</h2>
		<div class="text-panel__rich-text w-richtext">
		  <p>
		    Here are some of the key advantages of taking out a business
		    loan:
		  </p>
		  <ul role="list">
		    <li>
		      <strong>Improved cash flow</strong>: Get immediate capital
		      to smooth out fluctuations and keep your business moving
		      forward.
		    </li>
		    <li>
		      <strong>Growth and expansion</strong>: Fund new equipment,
		      additional inventory, or hire key staff to expand
		      operations.
		    </li>
		    <li>
		      <strong>Build credit history</strong>: Regular repayments
		      help <a href="#">build your business credit score</a>,
		      potentially enabling better borrowing terms in the
		      future.<strong>‍</strong>
		    </li>
		    <li>
		      <strong>Keep control</strong>: Retain full business
		      ownership, maintaining complete control over your
		      decisions, unlike <a href="#">equity financing</a>.
		    </li>
		  </ul>
		</div>
	      </div>`,
	disadvantages: `<div
		class="text-panel"
		id="w-node-_76a9f402-d7b8-b763-7474-39a72a93a262-cfae7a12"
	      >
		<h2 class="text-panel__heading">
		  <strong>Disadvantages of using business loans</strong>
		</h2>
		<div class="text-panel__rich-text w-richtext">
		  <p>
		    While business loans offer many benefits, there are some
		    downsides to consider:
		  </p>
		  <ul role="list">
		    <li>
		      <strong>Repayment obligations</strong>: Loans must be
		      repaid on schedule – missing payments could damage your
		      business credit rating.
		    </li>
		    <li>
		      <strong>Interest costs</strong>: Loans involve interest
		      payments, potentially increasing your overall costs,
		      especially with higher interest rates or longer terms.
		    </li>
		    <li>
		      <strong>Impact on cash flow</strong>: Regular repayments
		      could put pressure on your cash flow if not properly
		      managed.
		    </li>
		    <li>
		      <strong>Early repayment fees: </strong>With some lenders
		      you may have to pay a fee if you pay back your loan early.
		      Although if you take out an Contigo business loan, we will
		      never change you an early repayment fee.
		    </li>
		  </ul>
		  <p>
		    Only you can decide if a business loan is right for you –
		    make sure you take the time to compare providers and choose
		    one that fits with your needs, whether that means
		    flexibility, borrowing amounts or interest rates.&nbsp;
		  </p>
		</div>
	      </div>`,
	whereToGet: `<div
		class="text-panel"
		id="w-node-_2d687bec-67d0-f494-f72e-e1d9338f6cfa-cfae7a12"
	      >
		<h2 class="text-panel__heading">
		  <strong>Where to get a business loan</strong>
		</h2>
		<div class="text-panel__rich-text w-richtext">
		  <p>
		    There are two distinct groups of business loan providers:
		    high street banks and alternative lenders. They provide
		    slightly different products and user experiences, so it’s
		    important to select a lender whose offering best matches
		    your specific business needs.
		  </p>
		  <h3>High Street Banks</h3>
		  <p>
		    Traditional banks remain a common source for small business
		    loans. However when applying for bank loans, small
		    businesses are often faced with a slow &amp; bureaucratic
		    application process, rigid lending criteria and inflexible
		    loan terms. This is why many small businesses are turning to
		    alternative lenders, such as Contigo. <br />
		  </p>
		  <h3><strong>Alternative Lenders</strong></h3>
		  <p>
		    Alternative (or online) lenders offer a faster, more
		    customer-centric experience than high street banks. Although
		    alternative lenders may charge higher interest rates than
		    high street banks, they can still be a great choice for
		    short-term funding. Alternative lenders are often more
		    flexible than high street banks – for example, Contigo lets
		    you repay your loan early with no extra fees, helping you
		    save on interest over the long term.&nbsp;
		  </p>
		</div>
	      </div>`,
	loanAlternatives: `<div
		class="accordion-container"
		id="w-node-_7effeb11-ffb9-6e17-e628-97226be4a141-cfae7a12"
	      >
		<div class="bg-shape accordion-bg">
		  <img
		    alt="line arc"
		    loading="lazy"
		    src="../small-business-loans_files/62bd8dc400da51be7cfef695_line-arc.svg"
		  />
		</div>
		<div class="title-block tac">
		  <h2><strong>Alternatives to Business Loans</strong></h2>
		  <p>
		    There are a whole range of options for small business
		    funding out there – some designed for specific use cases,
		    while others are more general. The right choice for you will
		    depend on your particular needs and circumstances. Key ones
		    to know include:&nbsp;
		  </p>
		</div>
		<div class="accordion-wrap">
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			  >Lines of Credit</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			  <a href="#">Lines of credit</a>
			  are built around flexibility – they allow businesses
			  to draw funds as needed up to a set limit. Once you
			  reach that limit, the arrangement ends. These can be
			  useful when you’re not sure how much you need and want
			  to stay in control of how much you borrow and when.
			</p>
		      </div>
		    </div>
		  </div>
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			  >Equipment Financing</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			  As the name suggests,
			  <a href="#">equipment financing</a>
			  is meant for purchasing business equipment. That’s
			  because these loans use the equipment itself as
			  collateral. This can be ideal when you need to use
			  equipment to generate revenue, which helps repay the
			  loan.
			</p>
		      </div>
		    </div>
		  </div>
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			  >Invoice Financing</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			  <a href="#">Invoice financing</a>
			  allows businesses to borrow against the amounts due
			  from customers, providing immediate cash flow. This
			  can be useful if you have a large number of unpaid
			  invoices, providing short term relief and flexibility.
			</p>
		      </div>
		    </div>
		  </div>
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			  >Merchant Cash Advances</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			  Similar to invoice financing,
			  <a href="#">merchant cash advances</a>
			  are finance based on sales – except here it’s your
			  future revenue. Here, the lender provides funds in
			  exchange for a portion of daily credit card sales,
			  repaid on a flexible term until the sum and interest
			  are repaid.
			</p>
		      </div>
		    </div>
		  </div>
		</div>
	      </div>`,
	whySettleForLess: ` <div class="padding-vertical custom-component">
	    <div
	      class="title-block tac"
	      id="w-node-_43e5d7ec-bd45-55eb-3bb0-04768cfbe725-cfae7a12"
	    >
	      <h2
		class="feature-heading custom-heading-box"
		id="w-node-_43e5d7ec-bd45-55eb-3bb0-04768cfbe726-cfae7a12"
	      >
		<em>Why Settle for Less?</em>
		<p>
		  Traditional lenders: strict criteria, high fees, endless
		  paperwork.
		</p>
	      </h2>
	    </div>
	    <div
	      class="featured-grid featured-grid__3col"
	      id="w-node-_43e5d7ec-bd45-55eb-3bb0-04768cfbe72a-cfae7a12"
	    >
	      <div class="featured-grid__item">
		<img
		  alt="no pound Contigo"
		  class="featured-item__img"
		  loading="lazy"
		  src="../reusables/images/small-business-loans/others1.avif"
		/>
		<h3 class="mb-0-75">
		  Price Penalty

		  <br />
		</h3>
		<p class="small-text">
		  You don’t get the best market rates.
		  <br />
		</p>
	      </div>
	      <div class="featured-grid__item">
		<img
		  alt="lightning speed icon Contigo"
		  class="featured-item__img"
		  loading="lazy"
		  src="../reusables/images/small-business-loans/others2.avif"
		/>
		<h3 class="mb-0-75">Rigid Repayment<br /></h3>
		<p class="small-text">
		  No options in repayment schedules.<br />
		</p>
	      </div>
	      <div class="featured-grid__item">
		<img
		  alt="wallet icon Contigo"
		  class="featured-item__img"
		  loading="lazy"
		  src="../reusables/images/small-business-loans/others3.avif"
		/>
		<h3 class="mb-0-75">You pay twice.<br /></h3>
		<p class="small-text">
		  Both brokers and lenders charge you.<br />
		</p>
	      </div>
	    </div>
	  </div>`,
	loanFAQS: `<div
		class="accordion-container"
		id="w-node-_810512ea-ab67-f0a4-5162-78bcf94af4e4-cfae7a12"
	      >
		<div class="bg-shape accordion-bg">
		  <img
		    alt="line arc"
		    loading="lazy"
		    src="../small-business-loans_files/62bd8dc400da51be7cfef695_line-arc.svg"
		  />
		</div>
		<div class="title-block tac">
		  <h2>Business loan FAQs</h2>
		  <p class="large-text">
		    Here are some questions you could ask yourself about small
		    business loans eligibility. If there’s anything we haven’t
		    covered here, check our FAQ<br />
		  </p>
		</div>
		<div class="accordion-wrap">
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			>What are the costs of a small business loan?</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			    The costs of a small business loan in the UK can vary widely depending on the loan type, loan amount and loan term. Loans start from 0.8 % per month.
			</p>
		      </div>
		    </div>
		  </div>
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			>What are the differences between secured and
			    unsecured small business loans?</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			    Secured business loans are protected by collateral,
			    which is an asset that the lender can seize if you
			    fail to repay the loan. Secured loans usually offer
			    lower interest rates and higher loan amounts. On the
			    other hand, unsecured business loans don't require
			    collateral, but the lender may request a personal
			    guarantee.
			</p>
		      </div>
		    </div>
		  </div>
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			  >What is a good credit score to get a small business
			  loan?</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			  A
			  <a href="#">good credit score</a>
			  varies depending on the rating agency in question, but
			  generally the higher your score, the lower your
			  perceived risk. It’s worth noting, however, that your
			  credit score alone is usually insufficient to
			  determine your eligibility for a business loan. Most
			  lenders consider many factors, including financial
			  history and business performance.
			</p>
			<p>
			  The main thing lenders want to know is if your
			  business is healthy. This includes checking if it has
			  defaulted on debt, has any outstanding County Court
			  Judgments (CCJ), and has a solid customer base with
			  steady revenue.
			</p>
		      </div>
		    </div>
		  </div>
		  <div class="accordion-item">
		    <div
		      class="accordion-question"
		      data-ga-id="wantToKnowMore__question"
		    >
		      <h3 class="accordion-question__heading large-text">
			<strong data-ga-id="wantToKnowMore__question"
			>How can I get a small business loan with a poor
			    credit history?</strong
			>
		      </h3>
		      <img
			alt="plus sign"
			class="accordion-question__icon"
			data-ga-id="wantToKnowMore__question"
			loading="lazy"
			src="../small-business-loans_files/62baed12fa61b8e37f68b27d_plus.svg"
		      />
		    </div>
		    <div class="accordion-answer" style="display: none">
		      <div class="w-richtext">
			<p>
			    Getting a small business loan with a poor credit
			    history can be challenging, but it's not impossible.
			    Here are some tips to help you secure a loan:
			</p>
			<ul role="list">
			  <li class="list-item-2">
			      <strong>Check your credit score: </strong>Before
			      applying, check your credit score and identify areas
			      for improvement
			  </li>
			  <li class="list-item-2">
			      <strong>Improve your business finances: </strong
			      >Show lenders that your business is profitable and
			      has a solid financial foundation
			  </li>
			  <li class="list-item-2">
			      <strong>Explore alternative lenders: </strong
			      >Consider lenders that have more flexible
			    requirements and are more willing to work with
			      businesses with poor credit
			  </li>
			  <li class="list-item-2">
			    <strong>Provide collateral: </strong>If you have
			    assets that can be used as collateral, this can
			      increase your chances of getting approved
			  </li>
			  <li class="list-item-2">
			      <strong>Consider a co-signer: </strong>If you can
			      find someone with a strong credit score to co-sign
			      the loan, lenders may be more willing to approve
			      your application. However, this can be risky as the
			    co-signer is equally responsible for repaying the
			    loan.
			  </li>
			</ul>
			<p>
			    Keep in mind that getting a loan with poor credit can
			    come with higher interest rates. It's essential to
			    weigh your options carefully to avoid further
			    financial strain.
			</p>
		      </div>
		    </div>
		  </div>
		</div>
	      </div>`
};


const callModel = async ( prompt, image = false, imagePath ) => {
	if ( !image )
	{
		const response = await ai.models.generateContent( {
			model: "gemini-2.5-flash",
			contents: prompt
		} );
		return response.text;
	} else
	{
		// Set responseModalities to include "Image" so the model can generate  an image
		const response = await ai.models.generateContent( {
			model: "gemini-2.0-flash-preview-image-generation",
			contents: prompt,
			config: {
				responseModalities: [ Modality.TEXT, Modality.IMAGE ]
			}
		} );
		for ( const part of response.candidates[ 0 ].content.parts )
		{
			// Based on the part type, either show the text or save the image
			if ( part.text )
			{
				console.log( part.text );
			} else if ( part.inlineData )
			{
				const imageData = part.inlineData.data;
				const buffer = Buffer.from( imageData, "base64" );
				fs.writeFileSync( imagePath, buffer );
				console.log( `Image saved as ${ imagePath }` );
				const linker = imagePath.split( "\\" );
				return `./${ linker[ linker.length - 2 ] }/${ linker[ linker.length - 1 ] }`;
			} else
			{
				console.log( `Error: No text or image data found from model` );
			}
		}
	}
};

const replaceLines = async ( jsonData ) => {

	const pageId = randomUUID().substring( 0, 8 );

	let dirPath = path.join( __dirname, "article" );
	let imagesPath = path.join( dirPath, "images" );

	if ( !fs.existsSync( dirPath ) )
	{
		fs.mkdirSync( dirPath );
	}

	if ( !fs.existsSync( imagesPath ) )
	{
		fs.mkdirSync( imagesPath );
	}
	// console.log(dirPath);
	// return;
	fs.readFile( "./loans/debug.html", "utf8", async ( err, data ) => {
		if ( err )
		{
			console.error( "Error reading file:", err );
			return;
		}

		let lines = data.split( "\n" );

		// console.log( `
		//     1, ${ lines[ 15 ] }
		//     2, ${ lines[ 16 ] }
		//     3, ${ lines[ 3740 ] }
		//     4, ${ lines[ 3749 ] }
		//     5, ${ lines[ 3758 ] }
		//     6, ${ lines[ 3764 ] }
		//     7, ${ lines[ 3777 ] }
		//     8, ${ lines[ 3788 ] }
		//     9, ${ lines[ 3798 ] }
		//     10, ${ lines[ 3834 ] }
		//     11, ${ lines[ 3843 ] }
		//     12, ${ lines[ 3850 ] }
		//     13, ${ lines[ 3857 ] }
		//     `);
		// return;

		let title = await doAi( structure.title, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let metaTags = await doAi( structure.metaDescriptions, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let hero = await doAi( structure.hero, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let howItWorks = await doAi( structure.howItWorks, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let whatKindOfLoansAreAvailable = await doAi( structure.whatKindOfLoansAreAvailable, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let howToApply = await doAi( structure.howToApply, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let eligibility = await doAi( structure.eligibility, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let advantages = await doAi( structure.advantages, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let disadvantages = await doAi( structure.disadvantages, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let whereToGet = await doAi( structure.whereToGet, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let loanAlternatives = await doAi( structure.loanAlternatives, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let whySettleForLess = await doAi( structure.whySettleForLess, jsonData );
		await new Promise( resolve => setTimeout( resolve, 1000 ) );
		let loanFAQS = await doAi( structure.loanFAQS, jsonData );

		const match = hero.match( /<h1[^>]*>([\s\S]*?)<\/h1>/ );
		const h1TextRegex = match ? match[ 1 ].trim() : null;
		console.log( h1TextRegex );
		let pageName = toSeoSlug( h1TextRegex );

		lines[ 15 ] = title;
		lines[ 16 ] = metaTags;
		lines[ 3740 ] = hero;
		lines[ 3749 ] = howItWorks;
		lines[ 3758 ] = whatKindOfLoansAreAvailable;
		lines[ 3764 ] = howToApply;
		lines[ 3777 ] = eligibility;
		lines[ 3788 ] = advantages;
		lines[ 3798 ] = disadvantages;
		lines[ 3834 ] = whereToGet;
		lines[ 3843 ] = loanAlternatives;
		lines[ 3850 ] = whySettleForLess;
		lines[ 3857 ] = loanFAQS;

		if ( !fs.existsSync( dirPath ) )
		{
			fs.mkdirSync( dirPath, { recursive: true }, ( err ) => {
				if ( err )
				{
					console.error( "Error creating directory:", err );
				} else
				{
					console.log( "Directory created successfully: " + dirPath );
				}
			} );
		}
		// 2. Remove all occurrences of "```html"
		//    The 'g' flag in the regex ensures global replacement
		let updatedContent = lines.join( "\n" );
		updatedContent = updatedContent.replace( /```html/g, "" );

		// 3. Remove all occurrences of "```"
		updatedContent = updatedContent.replace( /```/g, "" );
		pageName = `${ pageName }-${ pageId }`;

		fs.writeFile( `${ dirPath }/${ pageName }.html`, updatedContent, "utf-8", ( err ) => {
			if ( err )
			{
				console.error( "Error writing file:", err );
			} else
			{
				console.log( `File written successfully at: ${ dirPath }\\${ pageName }.html` );
				console.log( `Last generated Index: ${ index }` );
				index += 1;
				getData( index );
			}
		} );

	} );
};


const doAi = async ( htmlFile, jsonData ) => {

	const prompt = `You are an expert HTML content modifier. Your only task is to update the inner text content of the provided HTML document. Follow these rules exactly.

				For the provided HTML document, your task is to update only the inner text content of all relevant visible HTML tags, guided by the context and values in the provided JSON object.

				The JSON is a contextual guide for what the page should communicate. Use it to generate natural, question-driven language rather than direct insertions — unless otherwise specified.

				JSON Object:
				${ jsonData }

				📌 Content Transformation Rules

				Primary Objective:
				Every sentence, heading, or paragraph must follow this structure:
				enuine long-tail question? Answer.
				Each HTML text element (e.g. "< h1 > ", " < p > ", " < li > ", " < meta > ") must be a self-contained Q&A block reflecting ${ jsonData[ "Sector" ] }, ${ jsonData[ "Loan Attributes" ] }, ${ jsonData[ "Intent & Financial Context" ] }, and ${ jsonData[ "City" ] }.

				🔑 Keyword Optimization
				- Embed relevant long-tail keywords naturally:
				- ${ jsonData[ "City" ] } ${ jsonData[ "Sector" ] } ${ jsonData[ "Loan Attributes" ] }
				- ${ jsonData[ "Loan Attributes" ] } for ${ jsonData[ "Sector" ] } ${ jsonData[ "Intent & Financial Context" ] }
				- Use them in titles, headers, paragraphs, meta tags, and FAQ questions.

				📄 Content Structure & Quality
				- Add TL;DR summaries before detailed answers.
				- Use active voice and comparison phrases  e.g., “Unlike traditional loans…”
				- Replace compound phrases( e.g., use “cash - flow” instead of “cash flow” ).

				🧠 Meta & Technical Enhancements
				- Update< title >  and  < meta name = "description" > :
				- Title should include${ jsonData[ "City" ] } ${ jsonData[ "Sector" ] } ${ jsonData[ "Loan Attributes" ] }  and be under 60 characters.
				- Description should highlight benefits and keywords in under 160 characters.
				- Ensure heading structure follows hierarchy: < h1 >  >  < h2 >  >  < h3 > , with keyword-rich questions.

				🧰 Direct Insertion Rules (Strict)
				- For < h1 >  inside  < div class="main-hero-grid" > :
				- Generate a long-tail question using the ${ jsonData } values.
				- Include one SEO keyword like ${ jsonData[ "City" ] } ${ jsonData[ "Sector" ] } ${ jsonData[ "Loan Attributes" ] } .
				- For < meta name = "description" > :
				- Summarize the benefits of ${ jsonData[ "Loan Attributes" ] }  for ${ jsonData[ "Sector" ] } ${ jsonData[ "Intent & Financial Context" ] } in ${ jsonData[ "City" ] }.
				- For <h3> inside <div class="featured-grid__item">:
				- Keep text short and relevant.

				📝 All Content Blocks Must:
				- Follow the format: Genuine long - tail question ? Answer.	- Start complex sections with a one - sentence TL; DR.
				- Include keyword - rich phrasing.
				- Be written with clarity, precision, and readability.

				🎯 Button Text:
				- Use clear, conversion - oriented labels like “Compare Rates” or “Check Eligibility”

				Final Output Format:
				Return the complete HTML document with only updated inner text content.Do not alter any HTML tags, attributes, or document structure or add extra completely new elements.
				Html to work with: ${ htmlFile } `;

	return await callModel( prompt );

};

// replaceLines();

const getData = async ( index ) => {
	await fs.readFile( "./x/newData2.json", "utf8", async ( err, data ) => {
		if ( err )
		{
			console.log( err );
			console.log( `last index: ${ index }` );
		} else
		{
			const fileData = JSON.parse( data );

			console.log( `Generating Index: ${ index }` );
			replaceLines( fileData[ index ] );

		}
	} );
};

// setInterval(() => {
//     getData(index);
//     index = index + 1;
// }, 15000);
// getData( index );
