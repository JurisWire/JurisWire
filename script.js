const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');
if(toggle && nav){toggle.addEventListener('click',()=>nav.classList.toggle('open'));}
nav.querySelectorAll('a').forEach(link=>{
  link.addEventListener('click',()=>{
    nav.classList.remove('open');
  });
});
document.querySelectorAll('[data-filter]').forEach(el=>{
  el.addEventListener('input',filterJudgments);
  el.addEventListener('change',filterJudgments);
});
function filterJudgments(){
  const q=(document.querySelector('#jsearch')?.value||'').toLowerCase();
  const court=document.querySelector('#courtFilter')?.value||'';
  const subject=document.querySelector('#subjectFilter')?.value||'';
  const year=document.querySelector('#yearFilter')?.value||'';
  document.querySelectorAll('#judgmentRows tr').forEach(row=>{
    const text=row.innerText.toLowerCase();
    const okQ=!q||text.includes(q);
    const okC=!court||row.dataset.court===court;
    const okS=!subject||row.dataset.subject===subject;
    const okY=!year||row.dataset.year===year;
    row.style.display=(okQ&&okC&&okS&&okY)?'':'none';
  });
}

document.querySelectorAll('.demo-form').forEach(form=>form.addEventListener('submit',e=>{
  e.preventDefault();
  const msg=form.querySelector('.form-msg');
  if(msg){msg.textContent='Thank you. This prototype form is ready to connect to your production backend.';}
}));

// Prototype newsroom publishing using browser localStorage.
const articleForm=document.querySelector('#articleForm');
function getArticles(){try{return JSON.parse(localStorage.getItem('juriswireArticles')||'[]')}catch(e){return[]}}
function renderRecent(){const box=document.querySelector('#recentArticles');if(!box)return;const items=getArticles();box.innerHTML=items.length?items.slice().reverse().slice(0,8).map(a=>`<span><strong>${a.title}</strong><br><small>${a.section} • ${a.status}</small></span>`).join(''):'<span>No prototype articles yet.</span>'}
function saveArticle(status){
  const title=document.querySelector('#articleTitle')?.value.trim();
  const body=document.querySelector('#articleBody')?.value.trim();
  if(!title||!body){const m=document.querySelector('#publishMsg');if(m)m.textContent='Headline and article body are required.';return}
  const items=getArticles();items.push({title,body,summary:document.querySelector('#articleSummary')?.value||'',section:document.querySelector('#articleSection')?.value||'Legal News',author:document.querySelector('#articleAuthor')?.value||'JurisWire News Desk',tags:document.querySelector('#articleTags')?.value||'',image:document.querySelector('#articleImage')?.value||'',status,date:new Date().toLocaleString()});localStorage.setItem('juriswireArticles',JSON.stringify(items));const m=document.querySelector('#publishMsg');if(m)m.textContent=status==='Published'?'Article published in this browser prototype.':'Draft saved in this browser prototype.';renderRecent();if(status==='Published')articleForm.reset();
}
if(articleForm){articleForm.addEventListener('submit',e=>{e.preventDefault();saveArticle('Published')});document.querySelector('#saveDraft')?.addEventListener('click',()=>saveArticle('Draft'));renderRecent()}

function genericFilter(inputId, selectId, containerSelector, itemSelector, dataKey){
 const input=document.querySelector(inputId), select=document.querySelector(selectId), container=document.querySelector(containerSelector); if(!container)return;
 const run=()=>{const q=(input?.value||'').toLowerCase(), v=select?.value||'';container.querySelectorAll(itemSelector).forEach(el=>{const text=el.innerText.toLowerCase();const okQ=!q||text.includes(q);const okV=!v||el.dataset[dataKey]===v;el.style.display=okQ&&okV?'':'none'})}; input?.addEventListener('input',run);select?.addEventListener('change',run)
}
genericFilter('#actSearch','#actCategory','#actGrid','.resource-card','cat');
genericFilter('#careerSearch','#careerType','#careerList','.job-card','type');

// JurisWire Legal Careers: public submission + moderated publication prototype.
function getCareerSubmissions(){try{return JSON.parse(localStorage.getItem('juriswireCareerSubmissions')||'[]')}catch(e){return[]}}
function setCareerSubmissions(items){localStorage.setItem('juriswireCareerSubmissions',JSON.stringify(items))}
function escapeHtml(v=''){return String(v).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]))}
function careerId(){return 'JW-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,5).toUpperCase()}

const careerSubmitForm=document.querySelector('#careerSubmitForm');
if(careerSubmitForm){careerSubmitForm.addEventListener('submit',e=>{e.preventDefault();const items=getCareerSubmissions();const record={id:careerId(),organisation:document.querySelector('#careerOrg').value.trim(),type:document.querySelector('#careerSubmitType').value,role:document.querySelector('#careerRole').value.trim(),location:document.querySelector('#careerLocation').value.trim(),mode:document.querySelector('#careerMode').value,eligibility:document.querySelector('#careerEligibility').value.trim(),vacancies:document.querySelector('#careerVacancies').value.trim(),pay:document.querySelector('#careerPay').value.trim(),deadline:document.querySelector('#careerDeadline').value,description:document.querySelector('#careerDescription').value.trim(),apply:document.querySelector('#careerApply').value.trim(),source:document.querySelector('#careerSource').value.trim(),recruiter:document.querySelector('#careerRecruiter').value.trim(),recruiterEmail:document.querySelector('#careerRecruiterEmail').value.trim(),status:'Pending Review',submittedAt:new Date().toISOString()};items.push(record);setCareerSubmissions(items);const msg=document.querySelector('#careerSubmitMsg');if(msg)msg.textContent=`Submitted successfully. Reference: ${record.id}. The listing is pending JurisWire review and is not yet public.`;careerSubmitForm.reset();renderPublicCareers();renderCareerModeration();})}

function renderPublicCareers(){const box=document.querySelector('#publicCareerListings');if(!box)return;const approved=getCareerSubmissions().filter(x=>x.status==='Published');box.innerHTML=approved.length?approved.slice().reverse().map(x=>`<article class="job-card" data-type="${escapeHtml(x.type)}"><div><div class="eyebrow">${escapeHtml(x.type)}</div><h3>${escapeHtml(x.role)}</h3><p>${escapeHtml(x.organisation)} • ${escapeHtml(x.location||'Location not specified')} • ${escapeHtml(x.mode||'')}</p><div class="job-meta"><span>${escapeHtml(x.eligibility||'Eligibility as notified')}</span>${x.deadline?`<span>Deadline: ${escapeHtml(x.deadline)}</span>`:''}<span>Ref: ${escapeHtml(x.id)}</span></div></div><a class="btn" href="${/^https?:\/\//i.test(x.apply)?escapeHtml(x.apply):'#'}" ${/^https?:\/\//i.test(x.apply)?'target="_blank" rel="noopener"':''}>APPLY / DETAILS</a></article>`).join(''):'';}

function renderCareerModeration(){const queue=document.querySelector('#careerModerationQueue'),pub=document.querySelector('#careerPublishedAdmin');if(!queue&&!pub)return;const items=getCareerSubmissions();if(queue){const pending=items.filter(x=>x.status==='Pending Review'||x.status==='Rejected');queue.innerHTML=pending.length?pending.slice().reverse().map(x=>`<div class="moderation-card"><span class="status-pill ${x.status==='Rejected'?'rejected':'pending'}">${escapeHtml(x.status)}</span><h4>${escapeHtml(x.role)}</h4><p><strong>${escapeHtml(x.organisation)}</strong> • ${escapeHtml(x.type)} • ${escapeHtml(x.location||'No location')}</p><p>${escapeHtml(x.description).slice(0,220)}${x.description.length>220?'…':''}</p><p><small>${escapeHtml(x.id)} • Submitted ${new Date(x.submittedAt).toLocaleString()}</small></p><div class="moderation-actions"><button class="btn small" onclick="moderateCareer('${x.id}','Published')">APPROVE & PUBLISH</button><button class="btn small danger" onclick="moderateCareer('${x.id}','Rejected')">REJECT</button></div></div>`).join(''):'<span>No pending submissions.</span>'}if(pub){const published=items.filter(x=>x.status==='Published');pub.innerHTML=published.length?published.slice().reverse().map(x=>`<div class="moderation-card"><span class="status-pill approved">Published</span><h4>${escapeHtml(x.role)}</h4><p><strong>${escapeHtml(x.organisation)}</strong> • ${escapeHtml(x.type)}</p><p><small>${escapeHtml(x.id)}</small></p><div class="moderation-actions"><button class="btn small danger" onclick="moderateCareer('${x.id}','Rejected')">UNPUBLISH</button></div></div>`).join(''):'<span>No approved public listings yet.</span>'}}
window.moderateCareer=function(id,status){const items=getCareerSubmissions();const item=items.find(x=>x.id===id);if(!item)return;item.status=status;item.reviewedAt=new Date().toISOString();setCareerSubmissions(items);renderCareerModeration();renderPublicCareers()}
renderPublicCareers();renderCareerModeration();
