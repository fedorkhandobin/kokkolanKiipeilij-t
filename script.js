const kiipeilyä  = {

    init: function () {
        this.header();
        this.mobileNav();
        this.slideshow();
        this.timeline();
        this.accordion();
        this.languageSwitcher();
        this.modal();
    },
  
    header: function() {

        let doc = document.documentElement;
        let w = window;
        
        let prevScroll = w.scrollY || doc.scrollTop;
        let curScroll;
        let direction = 0;
        let prevDirection = 0;
        
        let header = document.getElementById('site-header');

        
        let checkScroll = function() {
        
            /*
            Find the direction of scroll
            0 - initial, 1 - up, 2 - down
            */
        
            curScroll = w.scrollY || doc.scrollTop;
            if (curScroll > prevScroll) { 
            //scrolled up
            direction = 2;
            }
            else if (curScroll < prevScroll) { 
            //scrolled down
            direction = 1;
            }
        
            if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
            }
        
            prevScroll = curScroll;
        };
        
        //height of the header is 85px
        let toggleHeader = function(direction, curScroll) {
            if (direction === 2 && curScroll > 200) { 
        
        
            header.classList.add('hide');
            prevDirection = direction;
            }
            else if (direction === 1) {
            header.classList.remove('hide');
            prevDirection = direction;
            }
        };
        
        window.addEventListener('scroll', checkScroll);
    },


    mobileNav: function() {
        //burger menu toggle
        let burgerIcon = document.querySelector('[data-burger-menu]')
        let mobileContainer = document.querySelector('[data-mobile-container]')
        let nav = document.querySelector('[data-nav]')
        let navMobileClone = nav.cloneNode(true)
        navMobileClone.classList.add('nav-clone')
        navMobileClone.classList.remove('l-header__nav')

        burgerIcon.addEventListener('click', ()=> {
            mobileContainer.classList.toggle('hide')
            document.body.classList.toggle('non-scroll')
            // navMobileClone.style.display = 'flex'
            navMobileClone.classList.toggle('mobile-layout')
            burgerIcon.classList.toggle('close')
        })

        //get the menu items inside mobile container
        mobileContainer.appendChild(navMobileClone)


        //close mobile nav after link is selected
        const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'))
        if (screen.width > 768) return
        navLinks.forEach(link => {
            link.addEventListener('click', ()=> {
                document.body.classList.remove('non-scroll')
                burgerIcon.classList.remove('close')
                mobileContainer.classList.add('hide')
                // navMobileClone.style.display = 'none'
                navMobileClone.classList.remove('mobile-layout')
            })
        })
    },

    slideshow: function() {
        var elem = document.querySelector('.l-slideshow__container');
        if(screen.width > 768) {
            var flkty = new Flickity( elem, {
                // options
                cellAlign: 'left',
                contain: true,
                imagesLoaded: true,
                wrapAround: true,
                draggable: true
                });
        } else  {
            var flkty = new Flickity( elem, {
                // options
                cellAlign: 'left',
                prevNextButtons: false,
                contain: true,
                imagesLoaded: true,
                wrapAround: true,
                draggable: true,

                });
        }

    },

    
    timeline: function() {

        let timelineCards = Array.from(document.querySelectorAll('.l-timeline__card'));

        const appearOptions = {
            //the whole div should be visible before it starts to fade-in
            threshold: 0,
            rootMargin: "0px 0px -200px 0px"
        }

        const appearOnScroll = new IntersectionObserver
        (function(entries, appearOnScroll) {
            entries.forEach(entry => {
                //if element is not intersecting with the page, we want to return, as we will be not able to see it animated
                if (!entry.isIntersecting) {
                    return
                } else {
                    entry.target.classList.add('appear')
                    //stop obsddrving once it appears on screen
                    appearOnScroll.unobserve(entry.target)
                }
            })
        }, appearOptions)


        timelineCards.forEach(card => {
            appearOnScroll.observe(card)
        })

    },


    accordion: function() {
        const accordionCards = Array.from(document.querySelectorAll('[data-card]'))

        accordionCards.map(card => {
            card.addEventListener('click', () => {
                let content = card.children[1]
                content.classList.toggle('active')
                let btn = content.previousElementSibling.children[1];
                // console.log(btn)
                btn.classList.toggle('minus')
            })
        })
    },

    languageSwitcher: function() {
        let langInput = document.querySelector('[data-lang-input]')
        let engContainer = document.querySelector('.english-lang')
        let finContainer = document.querySelector('.finnish-lang')

        //hide english by default
        engContainer.classList.add('hide')
    

        langInput.addEventListener('change', ()=> {
            if (langInput.checked === true) {
                engContainer.classList.add('hide')
                finContainer.classList.remove('hide')
            } else {
                engContainer.classList.remove('hide')
                finContainer.classList.add('hide')
            }
        })

    },


    modal: function() {
        const modalOpenBtns = Array.from(document.querySelectorAll('[data-modal-btn]'))
        const modal = document.querySelector('[data-modal]')
        modalOpenBtns.forEach(btn => {
        btn.addEventListener('click', ()=> {
            modal.classList.add('open')
            document.body.classList.add('non-scroll')
        })
       })

       //close btn func 
       const closeModalBtn = document.querySelector('[data-close-btn-modal]')
       closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('open')
        document.body.classList.remove('non-scroll')
       })
    },


  
  }
  


  kiipeilyä.init()

