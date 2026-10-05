const launch = document.querySelector('#launchDemo');
const run = document.querySelector('#runProtocol');
const rows = [...document.querySelectorAll('.provider')];
const status = document.querySelector('#roundStatus');
const outcome = document.querySelector('#outcomeText');
const confidence = document.querySelector('#confidenceNum');
const bar = document.querySelector('#confidenceBar');
const settle = document.querySelector('#settle');
let running = false;

launch.addEventListener('click', () => document.querySelector('#protocol').scrollIntoView({behavior:'smooth'}));
run.addEventListener('click', runProtocol);
settle.addEventListener('click', () => {
  settle.innerHTML = 'Settled <span>✓</span>';
  settle.style.background = '#76f6e1';
  outcome.textContent = 'ACCEPTED · payout released';
  status.textContent = 'ESCROW RELEASED ON-CHAIN';
  document.querySelector('.escrow small').textContent = 'released to beneficiary';
});

function wait(ms){return new Promise(resolve=>setTimeout(resolve,ms));}
async function runProtocol(){
  if(running) return; running = true;
  run.textContent = 'Verification in progress…';
  run.style.opacity = '.55';
  status.textContent = 'COMMIT WINDOW OPEN';
  rows.forEach(row=>{row.classList.remove('committed'); row.querySelector('.status').className='status pending';row.querySelector('.status').textContent='pending'});
  for(const row of rows){await wait(380);row.classList.add('committed');row.querySelector('.status').className='status committed';row.querySelector('.status').textContent='committed';}
  await wait(700);status.textContent = 'REVEALING SIGNED EVIDENCE';
  for(const row of rows){await wait(280);row.querySelector('.status').className='status revealed';row.querySelector('.status').textContent='verified';}
  await wait(650); status.textContent = 'INDEPENDENCE ENGINE COMPLETE';
  outcome.textContent = 'ACCEPTED · 1.21m weighted'; confidence.textContent = '96.4%'; bar.style.width = '96.4%'; settle.disabled = false;
  run.innerHTML = 'Evidence round complete <i>✓</i>'; running = false;
}
