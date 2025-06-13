var style = document.createElement('style');
    style.textContent =
        'body{font-family:"Malgun Gothic",Verdana,Arial,sans-serif;font-size:11pt;}' +
        'textarea{width:800px;height:100px;margin:10px;padding:5px;}' +
        'input{width:800px;margin:10px;padding:5px;}' +
        'input.input1{width:420px;margin:10px 0 10px 10px;padding:5px;}' +
        'input.input2{width:40px;margin:10px 0;padding:5px;}' +
        'select{width:195px;margin:10px 0;padding:5px;}' +
        'div{width:810px;margin:10px;border:1px solid #ccc;}' +
        '.remove-btn{background:#fff;color:red;border:none;cursor:pointer;}' +
        'li{margin:0;padding:0;}' +
        '#symbolic-list li{display:flex;justify-content:space-between;border-bottom:1px solid #000;padding:4px 8px;}' +
        '#symbolic-list .expr{flex:1;}' +
        '#symbolic-list .note{min-width:160px;text-align:right;white-space:nowrap;}';
    document.head.appendChild(style);

/* ── 0. 본문 참조 ───────────────────────────── */
var body = document.body;

/* ── 1. 제목·설명·문제 입력 ─────────────────── */
var h1 = document.createElement('h1');
h1.textContent = '자연연역 연습장';
body.appendChild(h1);

var p = document.createElement('p');
p.textContent = '자연연역을 연습할 수 있는 공간입니다. 아래에 문제를 입력하고 복합명제를 추가하세요.';
body.appendChild(p);

var textarea = document.createElement('textarea');
textarea.id = 'problem-statements';
textarea.cols = 80;
textarea.rows = 5;
textarea.value =
    '아담이 백만장자라면, 가난은 이브가 그의 청혼을 거절한 이유가 아니다.\n' +
    '그런데 이브가 그의 청혼을 거절한 이유는 아담이 가난하다는 것 또는 그가 매력이 없다는 것 둘 중의 하나이다.\n' +
    '아담은 백만장자이다. 그러므로 매력이 없다는 것이 아담이 청혼을 거절당한 이유임에 틀림없다.';
body.appendChild(textarea);

/* ── 2. “복합명제” 입력 폼 ─────────────────── */
var formCompound = document.createElement('form');
formCompound.action = '#';

var newCompound = document.createElement('input');
newCompound.type = 'text';
newCompound.id = 'new-compound';
newCompound.placeholder = '복합명제를 입력하세요.';
formCompound.appendChild(newCompound);

var addCompoundBtn = document.createElement('button');
addCompoundBtn.type = 'button';
addCompoundBtn.id = 'add-compound-btn';
addCompoundBtn.textContent = '추가';
formCompound.appendChild(addCompoundBtn);

body.appendChild(formCompound);

var compoundDiv = document.createElement('div');
var compoundList = document.createElement('ol');
compoundList.id = 'compound-list';
compoundList.type = '1';
compoundDiv.appendChild(compoundList);
body.appendChild(compoundDiv);

/* ── 3. “단순명제” 입력 폼 ─────────────────── */
var formPrimary = document.createElement('form');
formPrimary.action = '#';

var newPrimary = document.createElement('input');
newPrimary.type = 'text';
newPrimary.id = 'new-primary';
newPrimary.placeholder = '단순명제를 입력하세요.';
formPrimary.appendChild(newPrimary);

var addPrimaryBtn = document.createElement('button');
addPrimaryBtn.type = 'button';
addPrimaryBtn.id = 'add-primary-btn';
addPrimaryBtn.textContent = '추가';
formPrimary.appendChild(addPrimaryBtn);

body.appendChild(formPrimary);

var primaryDiv = document.createElement('div');
var primaryList = document.createElement('ol');
primaryList.id = 'primary-list';
primaryList.type = 'A';
primaryDiv.appendChild(primaryList);
body.appendChild(primaryDiv);

/* ── 4. “기호명제” 입력 폼 ─────────────────── */
var formSymbolic = document.createElement('form');
formSymbolic.action = '#';

var newSymbolic = document.createElement('input');
newSymbolic.type = 'text';
newSymbolic.id = 'new-symbolic';
newSymbolic.className = 'input1';
newSymbolic.placeholder = '기호명제를 입력하세요.';
formSymbolic.appendChild(newSymbolic);

var ns1 = document.createElement('input');
ns1.type = 'text';
ns1.id = 'ns1';
ns1.className = 'input2';
formSymbolic.appendChild(ns1);

var ns2 = document.createElement('input');
ns2.type = 'text';
ns2.id = 'ns2';
ns2.className = 'input2';
formSymbolic.appendChild(ns2);

var ns3 = document.createElement('input');
ns3.type = 'text';
ns3.id = 'ns3';
ns3.className = 'input2';
formSymbolic.appendChild(ns3);

var ruleSelect = document.createElement('select');
ruleSelect.id = 'natual-deduction-rule';
var rules = [
    '전제', '결론', ' → 제거', '∨ 제거', '∨ 도입', '→ 도입',
    '∧ 제거', '∧ 도입', '↔ 도입', '↔ 제거', '∼ 제거', '∼ 도입'
];
for (var i = 0; i < rules.length; i++) {
    var option = document.createElement('option');
    option.value = rules[i];
    option.textContent = rules[i];
    ruleSelect.appendChild(option);
}
formSymbolic.appendChild(ruleSelect);
ns3.value = ruleSelect.value;   // 기본값 복사

formSymbolic.appendChild(document.createElement('br'));

var addSymbolicBtn = document.createElement('button');
addSymbolicBtn.type = 'button';
addSymbolicBtn.id = 'add-symbolic-btn';
addSymbolicBtn.textContent = '추가';
formSymbolic.appendChild(addSymbolicBtn);

// 기호 단축 버튼들
var symbols = [
    { id: 'not-btn', txt: '∼' },
    { id: 'and-btn', txt: '∧' },
    { id: 'or-btn', txt: '∨' },
    { id: 'imp-btn', txt: '→' },
    { id: 'bi-imp-btn', txt: '↔' }
];
for (i = 0; i < symbols.length; i++) {
    var sbtn = document.createElement('button');
    sbtn.type = 'button';
    sbtn.id = symbols[i].id;
    sbtn.textContent = symbols[i].txt;
    formSymbolic.appendChild(sbtn);
}

body.appendChild(formSymbolic);

var symbolicDiv = document.createElement('div');
var symbolicList = document.createElement('ol');
symbolicList.id = 'symbolic-list';
symbolicList.type = '1';
symbolicDiv.appendChild(symbolicList);
body.appendChild(symbolicDiv);

/* ── 5. 이벤트 핸들러 ───────────────────────── */

// 복합명제 추가
addCompoundBtn.addEventListener('click', function () {
    if (!newCompound.value.trim()) return;
    var li = document.createElement('li');
    li.textContent = newCompound.value.trim();

    var rm = document.createElement('button');
    rm.type = 'button';
    rm.textContent = '[X]';
    rm.className = 'remove-btn';
    rm.addEventListener('click', function () {
        compoundList.removeChild(li);
    });
    li.appendChild(rm);

    compoundList.appendChild(li);
    newCompound.value = '';
    newCompound.focus();
});

// 단순명제 추가
addPrimaryBtn.addEventListener('click', function () {
    if (!newPrimary.value.trim()) return;
    var li = document.createElement('li');
    li.textContent = newPrimary.value.trim();

    var rm = document.createElement('button');
    rm.type = 'button';
    rm.textContent = '[X]';
    rm.className = 'remove-btn';
    rm.addEventListener('click', function () {
        primaryList.removeChild(li);
    });
    li.appendChild(rm);

    primaryList.appendChild(li);
    newPrimary.value = '';
    newPrimary.focus();
});

// 규칙 선택 시 ns3에 복사
ruleSelect.addEventListener('change', function () {
    ns3.value = ruleSelect.value;
});

// 기호 단축 버튼(∼ ∧ ∨ → ↔)
formSymbolic.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.id.endsWith('-btn') && e.target !== addSymbolicBtn) {
        newSymbolic.value += e.target.textContent;
        newSymbolic.focus();
    }
});

// 기호명제 추가
addSymbolicBtn.addEventListener('click', function () {
    if (!newSymbolic.value.trim()) return;

    var li = document.createElement('li');

    // 왼쪽 : 논리식
    var expr = document.createElement('span');
    expr.className = 'expr';
    expr.textContent = newSymbolic.value.trim();
    li.appendChild(expr);

    // 오른쪽 : 번호·규칙
    var note = document.createElement('span');
    note.className = 'note'; 
    var notes = [];
    if (ns1.value) notes.push(ns1.value);
    if (ns2.value) notes.push(ns2.value);
    if (ns3.value) notes.push(ns3.value);
    note.textContent = '    ' + notes.join(', ');
    li.appendChild(note);

    var rm = document.createElement('button');
    rm.type = 'button';
    rm.textContent = '[X]';
    rm.className = 'remove-btn';
    rm.addEventListener('click', function () {
        symbolicList.removeChild(li);
    });
    li.appendChild(rm);

    symbolicList.appendChild(li);

    // 초기화
    newSymbolic.value = '';
    ns1.value = '';
    ns2.value = '';
    newSymbolic.focus();
});