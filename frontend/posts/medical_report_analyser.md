Hello there 👋

Welcome to **XRaiga** again.

In this post, I'm going to share a little project I made for my sister — a project that came into existence after she asked me for help with something.

My sister works at a hospital, and one day she asked me if I could help her analyze some medical reports in a Google Spreadsheet.

She explained what needed to be done, and I started going through the data to figure out how I could help.

And that's where the idea for this project began.

---

## How exactly did I come up with this idea?

As I mentioned earlier, it all started when my sister asked me for help with her report analysis.

She explained the process and what information she needed from the reports. I started looking through the spreadsheet and trying to figure out how to perform the analysis efficiently.

After going through it, I realized that doing everything manually in Excel would be quite difficult and time-consuming.

So I thought:

> Why not just program it?

And honestly, that's usually my first instinct whenever I see a repetitive task. 😭

---

## So, how exactly did I start?

The first thing I did was export the spreadsheet as a CSV file.

CSV is one of my favourite file formats to work with. It's simple, lightweight, and extremely easy to process programmatically.

I then imported a JavaScript library called PapaParse, which makes parsing CSV files ridiculously easy. It basically takes the CSV data and converts it into a format that I can work with in JavaScript.

Once I had the data, I could finally start writing the actual analysis logic.

At first, I didn't care about how the application looked.

I just made a very simple web app:

- A file input to select the CSV
- Some JavaScript to process the data
- A section to display the results

That's it.

No fancy UI.

No animations.

No beautiful buttons.

Just pure functionality. 💀

And honestly, that's probably the best way to start a project like this.

---

## What did I do next?

Once I got the analysis working correctly, I had another problem.

Nobody wants to use an ugly application. 😭

So I decided to make the interface more user-friendly.

I'm not exactly the best person when it comes to designing interfaces, so I did what I usually do:

I asked ChatGPT for help.

I fed my rather ugly-looking code to ChatGPT and asked it to improve the design.

After a few iterations, I ended up with a much cleaner interface that was considerably nicer to use.

Once everything was working, I hosted the web app and shared it with my sister along with some simple instructions on how to use it.

And...

It worked.

She was able to get the job done.

And that's honestly what mattered the most.

---

## What did I learn from this?

This wasn't some massive project where I learned ten new frameworks or built some revolutionary system.

It was actually quite a small project.

But it taught me something I think is much more important.

Sometimes, programming isn't about building something impressive.

Sometimes, it's simply about solving a problem for someone.

I got to use something I enjoy doing — programming — to make someone else's work a little easier.

And that's a pretty satisfying feeling.

I also picked up a few small things along the way, especially around CSV processing, data handling, and building a simple client-side web application.

---

## Preview

I would have loved to show the entire application working with the actual data, but unfortunately, I can't share the medical records because of privacy concerns.

So instead, I'll just share a screenshot of the application.

![Screenshot](/assets/medical_record_analyser/pic.png)

You can also check out the live web app and the source code:

[Live Web App](https://medicalrecord.xraiga.dev/)

[GitHub Repository](https://github.com/C-Namgyel/Medical-Report-Analyzer/)

---

# In the end

I'm glad my sister asked me for help that day.

Not because it gave me another project to work on, but because it reminded me why I like programming in the first place.

You build something.
Someone uses it.
And their life gets a little easier.

That's pretty damn cool.

— **Chencho Namgyel Ghalley**