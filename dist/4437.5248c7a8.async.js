(self["webpackChunkBeeFarmingFE"]=self["webpackChunkBeeFarmingFE"]||[]).push([[4437],{84437:function(e,t,n){"use strict";n.r(t),n.d(t,{CompletionAdapter:function(){return Ee},DefinitionAdapter:function(){return Oe},DiagnosticsAdapter:function(){return ke},DocumentColorAdapter:function(){return qe},DocumentFormattingEditProvider:function(){return Xe},DocumentHighlightAdapter:function(){return Le},DocumentLinkAdapter:function(){return ze},DocumentRangeFormattingEditProvider:function(){return Be},DocumentSymbolAdapter:function(){return He},FoldingRangeAdapter:function(){return Qe},HoverAdapter:function(){return De},ReferenceAdapter:function(){return Ue},RenameAdapter:function(){return We},SelectionRangeAdapter:function(){return Je},WorkerManager:function(){return N},fromPosition:function(){return Ce},fromRange:function(){return xe},setupMode:function(){return Ye},toRange:function(){return Ae},toTextEdit:function(){return Re}});var r=n(28814),i=Object.defineProperty,o=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyNames,s=Object.prototype.hasOwnProperty,u=(e,t,n,r)=>{if(t&&"object"===typeof t||"function"===typeof t)for(let u of a(t))s.call(e,u)||u===n||i(e,u,{get:()=>t[u],enumerable:!(r=o(t,u))||r.enumerable});return e},c=(e,t,n)=>(u(e,t,"default"),n&&u(n,t,"default")),d={};c(d,r);var g,l,f,h,p,m,v,_,w,k,b,y,E,C,x,A,I,S,R,T,D,M,P,F,L,j,O=12e4,N=class{_defaults;_idleCheckInterval;_lastUsedTime;_configChangeListener;_worker;_client;constructor(e){this._defaults=e,this._worker=null,this._client=null,this._idleCheckInterval=window.setInterval((()=>this._checkIfIdle()),3e4),this._lastUsedTime=0,this._configChangeListener=this._defaults.onDidChange((()=>this._stopWorker()))}_stopWorker(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null}dispose(){clearInterval(this._idleCheckInterval),this._configChangeListener.dispose(),this._stopWorker()}_checkIfIdle(){if(!this._worker)return;let e=Date.now()-this._lastUsedTime;e>O&&this._stopWorker()}_getClient(){return this._lastUsedTime=Date.now(),this._client||(this._worker=d.editor.createWebWorker({moduleId:"vs/language/css/cssWorker",label:this._defaults.languageId,createData:{options:this._defaults.options,languageId:this._defaults.languageId}}),this._client=this._worker.getProxy()),this._client}getLanguageServiceWorker(...e){let t;return this._getClient().then((e=>{t=e})).then((t=>{if(this._worker)return this._worker.withSyncedResources(e)})).then((e=>t))}};(function(e){e.MIN_VALUE=-2147483648,e.MAX_VALUE=2147483647})(g||(g={})),function(e){e.MIN_VALUE=0,e.MAX_VALUE=2147483647}(l||(l={})),function(e){function t(e,t){return e===Number.MAX_VALUE&&(e=l.MAX_VALUE),t===Number.MAX_VALUE&&(t=l.MAX_VALUE),{line:e,character:t}}function n(e){var t=e;return _e.objectLiteral(t)&&_e.uinteger(t.line)&&_e.uinteger(t.character)}e.create=t,e.is=n}(f||(f={})),function(e){function t(e,t,n,r){if(_e.uinteger(e)&&_e.uinteger(t)&&_e.uinteger(n)&&_e.uinteger(r))return{start:f.create(e,t),end:f.create(n,r)};if(f.is(e)&&f.is(t))return{start:e,end:t};throw new Error("Range#create called with invalid arguments["+e+", "+t+", "+n+", "+r+"]")}function n(e){var t=e;return _e.objectLiteral(t)&&f.is(t.start)&&f.is(t.end)}e.create=t,e.is=n}(h||(h={})),function(e){function t(e,t){return{uri:e,range:t}}function n(e){var t=e;return _e.defined(t)&&h.is(t.range)&&(_e.string(t.uri)||_e.undefined(t.uri))}e.create=t,e.is=n}(p||(p={})),function(e){function t(e,t,n,r){return{targetUri:e,targetRange:t,targetSelectionRange:n,originSelectionRange:r}}function n(e){var t=e;return _e.defined(t)&&h.is(t.targetRange)&&_e.string(t.targetUri)&&(h.is(t.targetSelectionRange)||_e.undefined(t.targetSelectionRange))&&(h.is(t.originSelectionRange)||_e.undefined(t.originSelectionRange))}e.create=t,e.is=n}(m||(m={})),function(e){function t(e,t,n,r){return{red:e,green:t,blue:n,alpha:r}}function n(e){var t=e;return _e.numberRange(t.red,0,1)&&_e.numberRange(t.green,0,1)&&_e.numberRange(t.blue,0,1)&&_e.numberRange(t.alpha,0,1)}e.create=t,e.is=n}(v||(v={})),function(e){function t(e,t){return{range:e,color:t}}function n(e){var t=e;return h.is(t.range)&&v.is(t.color)}e.create=t,e.is=n}(_||(_={})),function(e){function t(e,t,n){return{label:e,textEdit:t,additionalTextEdits:n}}function n(e){var t=e;return _e.string(t.label)&&(_e.undefined(t.textEdit)||S.is(t))&&(_e.undefined(t.additionalTextEdits)||_e.typedArray(t.additionalTextEdits,S.is))}e.create=t,e.is=n}(w||(w={})),function(e){e["Comment"]="comment",e["Imports"]="imports",e["Region"]="region"}(k||(k={})),function(e){function t(e,t,n,r,i){var o={startLine:e,endLine:t};return _e.defined(n)&&(o.startCharacter=n),_e.defined(r)&&(o.endCharacter=r),_e.defined(i)&&(o.kind=i),o}function n(e){var t=e;return _e.uinteger(t.startLine)&&_e.uinteger(t.startLine)&&(_e.undefined(t.startCharacter)||_e.uinteger(t.startCharacter))&&(_e.undefined(t.endCharacter)||_e.uinteger(t.endCharacter))&&(_e.undefined(t.kind)||_e.string(t.kind))}e.create=t,e.is=n}(b||(b={})),function(e){function t(e,t){return{location:e,message:t}}function n(e){var t=e;return _e.defined(t)&&p.is(t.location)&&_e.string(t.message)}e.create=t,e.is=n}(y||(y={})),function(e){e.Error=1,e.Warning=2,e.Information=3,e.Hint=4}(E||(E={})),function(e){e.Unnecessary=1,e.Deprecated=2}(C||(C={})),function(e){function t(e){var t=e;return void 0!==t&&null!==t&&_e.string(t.href)}e.is=t}(x||(x={})),function(e){function t(e,t,n,r,i,o){var a={range:e,message:t};return _e.defined(n)&&(a.severity=n),_e.defined(r)&&(a.code=r),_e.defined(i)&&(a.source=i),_e.defined(o)&&(a.relatedInformation=o),a}function n(e){var t,n=e;return _e.defined(n)&&h.is(n.range)&&_e.string(n.message)&&(_e.number(n.severity)||_e.undefined(n.severity))&&(_e.integer(n.code)||_e.string(n.code)||_e.undefined(n.code))&&(_e.undefined(n.codeDescription)||_e.string(null===(t=n.codeDescription)||void 0===t?void 0:t.href))&&(_e.string(n.source)||_e.undefined(n.source))&&(_e.undefined(n.relatedInformation)||_e.typedArray(n.relatedInformation,y.is))}e.create=t,e.is=n}(A||(A={})),function(e){function t(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={title:e,command:t};return _e.defined(n)&&n.length>0&&(i.arguments=n),i}function n(e){var t=e;return _e.defined(t)&&_e.string(t.title)&&_e.string(t.command)}e.create=t,e.is=n}(I||(I={})),function(e){function t(e,t){return{range:e,newText:t}}function n(e,t){return{range:{start:e,end:e},newText:t}}function r(e){return{range:e,newText:""}}function i(e){var t=e;return _e.objectLiteral(t)&&_e.string(t.newText)&&h.is(t.range)}e.replace=t,e.insert=n,e.del=r,e.is=i}(S||(S={})),function(e){function t(e,t,n){var r={label:e};return void 0!==t&&(r.needsConfirmation=t),void 0!==n&&(r.description=n),r}function n(e){var t=e;return void 0!==t&&_e.objectLiteral(t)&&_e.string(t.label)&&(_e.boolean(t.needsConfirmation)||void 0===t.needsConfirmation)&&(_e.string(t.description)||void 0===t.description)}e.create=t,e.is=n}(R||(R={})),function(e){function t(e){var t=e;return"string"===typeof t}e.is=t}(T||(T={})),function(e){function t(e,t,n){return{range:e,newText:t,annotationId:n}}function n(e,t,n){return{range:{start:e,end:e},newText:t,annotationId:n}}function r(e,t){return{range:e,newText:"",annotationId:t}}function i(e){var t=e;return S.is(t)&&(R.is(t.annotationId)||T.is(t.annotationId))}e.replace=t,e.insert=n,e.del=r,e.is=i}(D||(D={})),function(e){function t(e,t){return{textDocument:e,edits:t}}function n(e){var t=e;return _e.defined(t)&&V.is(t.textDocument)&&Array.isArray(t.edits)}e.create=t,e.is=n}(M||(M={})),function(e){function t(e,t,n){var r={kind:"create",uri:e};return void 0===t||void 0===t.overwrite&&void 0===t.ignoreIfExists||(r.options=t),void 0!==n&&(r.annotationId=n),r}function n(e){var t=e;return t&&"create"===t.kind&&_e.string(t.uri)&&(void 0===t.options||(void 0===t.options.overwrite||_e.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||_e.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||T.is(t.annotationId))}e.create=t,e.is=n}(P||(P={})),function(e){function t(e,t,n,r){var i={kind:"rename",oldUri:e,newUri:t};return void 0===n||void 0===n.overwrite&&void 0===n.ignoreIfExists||(i.options=n),void 0!==r&&(i.annotationId=r),i}function n(e){var t=e;return t&&"rename"===t.kind&&_e.string(t.oldUri)&&_e.string(t.newUri)&&(void 0===t.options||(void 0===t.options.overwrite||_e.boolean(t.options.overwrite))&&(void 0===t.options.ignoreIfExists||_e.boolean(t.options.ignoreIfExists)))&&(void 0===t.annotationId||T.is(t.annotationId))}e.create=t,e.is=n}(F||(F={})),function(e){function t(e,t,n){var r={kind:"delete",uri:e};return void 0===t||void 0===t.recursive&&void 0===t.ignoreIfNotExists||(r.options=t),void 0!==n&&(r.annotationId=n),r}function n(e){var t=e;return t&&"delete"===t.kind&&_e.string(t.uri)&&(void 0===t.options||(void 0===t.options.recursive||_e.boolean(t.options.recursive))&&(void 0===t.options.ignoreIfNotExists||_e.boolean(t.options.ignoreIfNotExists)))&&(void 0===t.annotationId||T.is(t.annotationId))}e.create=t,e.is=n}(L||(L={})),function(e){function t(e){var t=e;return t&&(void 0!==t.changes||void 0!==t.documentChanges)&&(void 0===t.documentChanges||t.documentChanges.every((function(e){return _e.string(e.kind)?P.is(e)||F.is(e)||L.is(e):M.is(e)})))}e.is=t}(j||(j={}));var U,W,V,H,K,z,X,B,$,q,Q,G,J,Y,Z,ee,te,ne,re,ie,oe,ae,se,ue,ce,de,ge,le,fe,he,pe,me=function(){function e(e,t){this.edits=e,this.changeAnnotations=t}return e.prototype.insert=function(e,t,n){var r,i;if(void 0===n?r=S.insert(e,t):T.is(n)?(i=n,r=D.insert(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=D.insert(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.replace=function(e,t,n){var r,i;if(void 0===n?r=S.replace(e,t):T.is(n)?(i=n,r=D.replace(e,t,n)):(this.assertChangeAnnotations(this.changeAnnotations),i=this.changeAnnotations.manage(n),r=D.replace(e,t,i)),this.edits.push(r),void 0!==i)return i},e.prototype.delete=function(e,t){var n,r;if(void 0===t?n=S.del(e):T.is(t)?(r=t,n=D.del(e,t)):(this.assertChangeAnnotations(this.changeAnnotations),r=this.changeAnnotations.manage(t),n=D.del(e,r)),this.edits.push(n),void 0!==r)return r},e.prototype.add=function(e){this.edits.push(e)},e.prototype.all=function(){return this.edits},e.prototype.clear=function(){this.edits.splice(0,this.edits.length)},e.prototype.assertChangeAnnotations=function(e){if(void 0===e)throw new Error("Text edit change is not configured to manage change annotations.")},e}(),ve=function(){function e(e){this._annotations=void 0===e?Object.create(null):e,this._counter=0,this._size=0}return e.prototype.all=function(){return this._annotations},Object.defineProperty(e.prototype,"size",{get:function(){return this._size},enumerable:!1,configurable:!0}),e.prototype.manage=function(e,t){var n;if(T.is(e)?n=e:(n=this.nextId(),t=e),void 0!==this._annotations[n])throw new Error("Id "+n+" is already in use.");if(void 0===t)throw new Error("No annotation provided for id "+n);return this._annotations[n]=t,this._size++,n},e.prototype.nextId=function(){return this._counter++,this._counter.toString()},e}();(function(){function e(e){var t=this;this._textEditChanges=Object.create(null),void 0!==e?(this._workspaceEdit=e,e.documentChanges?(this._changeAnnotations=new ve(e.changeAnnotations),e.changeAnnotations=this._changeAnnotations.all(),e.documentChanges.forEach((function(e){if(M.is(e)){var n=new me(e.edits,t._changeAnnotations);t._textEditChanges[e.textDocument.uri]=n}}))):e.changes&&Object.keys(e.changes).forEach((function(n){var r=new me(e.changes[n]);t._textEditChanges[n]=r}))):this._workspaceEdit={}}Object.defineProperty(e.prototype,"edit",{get:function(){return this.initDocumentChanges(),void 0!==this._changeAnnotations&&(0===this._changeAnnotations.size?this._workspaceEdit.changeAnnotations=void 0:this._workspaceEdit.changeAnnotations=this._changeAnnotations.all()),this._workspaceEdit},enumerable:!1,configurable:!0}),e.prototype.getTextEditChange=function(e){if(V.is(e)){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var t={uri:e.uri,version:e.version},n=this._textEditChanges[t.uri];if(!n){var r=[],i={textDocument:t,edits:r};this._workspaceEdit.documentChanges.push(i),n=new me(r,this._changeAnnotations),this._textEditChanges[t.uri]=n}return n}if(this.initChanges(),void 0===this._workspaceEdit.changes)throw new Error("Workspace edit is not configured for normal text edit changes.");n=this._textEditChanges[e];if(!n){r=[];this._workspaceEdit.changes[e]=r,n=new me(r),this._textEditChanges[e]=n}return n},e.prototype.initDocumentChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._changeAnnotations=new ve,this._workspaceEdit.documentChanges=[],this._workspaceEdit.changeAnnotations=this._changeAnnotations.all())},e.prototype.initChanges=function(){void 0===this._workspaceEdit.documentChanges&&void 0===this._workspaceEdit.changes&&(this._workspaceEdit.changes=Object.create(null))},e.prototype.createFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(R.is(t)||T.is(t)?r=t:n=t,void 0===r?i=P.create(e,n):(o=T.is(r)?r:this._changeAnnotations.manage(r),i=P.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o},e.prototype.renameFile=function(e,t,n,r){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var i,o,a;if(R.is(n)||T.is(n)?i=n:r=n,void 0===i?o=F.create(e,t,r):(a=T.is(i)?i:this._changeAnnotations.manage(i),o=F.create(e,t,r,a)),this._workspaceEdit.documentChanges.push(o),void 0!==a)return a},e.prototype.deleteFile=function(e,t,n){if(this.initDocumentChanges(),void 0===this._workspaceEdit.documentChanges)throw new Error("Workspace edit is not configured for document changes.");var r,i,o;if(R.is(t)||T.is(t)?r=t:n=t,void 0===r?i=L.create(e,n):(o=T.is(r)?r:this._changeAnnotations.manage(r),i=L.create(e,n,o)),this._workspaceEdit.documentChanges.push(i),void 0!==o)return o}})();(function(e){function t(e){return{uri:e}}function n(e){var t=e;return _e.defined(t)&&_e.string(t.uri)}e.create=t,e.is=n})(U||(U={})),function(e){function t(e,t){return{uri:e,version:t}}function n(e){var t=e;return _e.defined(t)&&_e.string(t.uri)&&_e.integer(t.version)}e.create=t,e.is=n}(W||(W={})),function(e){function t(e,t){return{uri:e,version:t}}function n(e){var t=e;return _e.defined(t)&&_e.string(t.uri)&&(null===t.version||_e.integer(t.version))}e.create=t,e.is=n}(V||(V={})),function(e){function t(e,t,n,r){return{uri:e,languageId:t,version:n,text:r}}function n(e){var t=e;return _e.defined(t)&&_e.string(t.uri)&&_e.string(t.languageId)&&_e.integer(t.version)&&_e.string(t.text)}e.create=t,e.is=n}(H||(H={})),function(e){e.PlainText="plaintext",e.Markdown="markdown"}(K||(K={})),function(e){function t(t){var n=t;return n===e.PlainText||n===e.Markdown}e.is=t}(K||(K={})),function(e){function t(e){var t=e;return _e.objectLiteral(e)&&K.is(t.kind)&&_e.string(t.value)}e.is=t}(z||(z={})),function(e){e.Text=1,e.Method=2,e.Function=3,e.Constructor=4,e.Field=5,e.Variable=6,e.Class=7,e.Interface=8,e.Module=9,e.Property=10,e.Unit=11,e.Value=12,e.Enum=13,e.Keyword=14,e.Snippet=15,e.Color=16,e.File=17,e.Reference=18,e.Folder=19,e.EnumMember=20,e.Constant=21,e.Struct=22,e.Event=23,e.Operator=24,e.TypeParameter=25}(X||(X={})),function(e){e.PlainText=1,e.Snippet=2}(B||(B={})),function(e){e.Deprecated=1}($||($={})),function(e){function t(e,t,n){return{newText:e,insert:t,replace:n}}function n(e){var t=e;return t&&_e.string(t.newText)&&h.is(t.insert)&&h.is(t.replace)}e.create=t,e.is=n}(q||(q={})),function(e){e.asIs=1,e.adjustIndentation=2}(Q||(Q={})),function(e){function t(e){return{label:e}}e.create=t}(G||(G={})),function(e){function t(e,t){return{items:e||[],isIncomplete:!!t}}e.create=t}(J||(J={})),function(e){function t(e){return e.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}function n(e){var t=e;return _e.string(t)||_e.objectLiteral(t)&&_e.string(t.language)&&_e.string(t.value)}e.fromPlainText=t,e.is=n}(Y||(Y={})),function(e){function t(e){var t=e;return!!t&&_e.objectLiteral(t)&&(z.is(t.contents)||Y.is(t.contents)||_e.typedArray(t.contents,Y.is))&&(void 0===e.range||h.is(e.range))}e.is=t}(Z||(Z={})),function(e){function t(e,t){return t?{label:e,documentation:t}:{label:e}}e.create=t}(ee||(ee={})),function(e){function t(e,t){for(var n=[],r=2;r<arguments.length;r++)n[r-2]=arguments[r];var i={label:e};return _e.defined(t)&&(i.documentation=t),_e.defined(n)?i.parameters=n:i.parameters=[],i}e.create=t}(te||(te={})),function(e){e.Text=1,e.Read=2,e.Write=3}(ne||(ne={})),function(e){function t(e,t){var n={range:e};return _e.number(t)&&(n.kind=t),n}e.create=t}(re||(re={})),function(e){e.File=1,e.Module=2,e.Namespace=3,e.Package=4,e.Class=5,e.Method=6,e.Property=7,e.Field=8,e.Constructor=9,e.Enum=10,e.Interface=11,e.Function=12,e.Variable=13,e.Constant=14,e.String=15,e.Number=16,e.Boolean=17,e.Array=18,e.Object=19,e.Key=20,e.Null=21,e.EnumMember=22,e.Struct=23,e.Event=24,e.Operator=25,e.TypeParameter=26}(ie||(ie={})),function(e){e.Deprecated=1}(oe||(oe={})),function(e){function t(e,t,n,r,i){var o={name:e,kind:t,location:{uri:r,range:n}};return i&&(o.containerName=i),o}e.create=t}(ae||(ae={})),function(e){function t(e,t,n,r,i,o){var a={name:e,detail:t,kind:n,range:r,selectionRange:i};return void 0!==o&&(a.children=o),a}function n(e){var t=e;return t&&_e.string(t.name)&&_e.number(t.kind)&&h.is(t.range)&&h.is(t.selectionRange)&&(void 0===t.detail||_e.string(t.detail))&&(void 0===t.deprecated||_e.boolean(t.deprecated))&&(void 0===t.children||Array.isArray(t.children))&&(void 0===t.tags||Array.isArray(t.tags))}e.create=t,e.is=n}(se||(se={})),function(e){e.Empty="",e.QuickFix="quickfix",e.Refactor="refactor",e.RefactorExtract="refactor.extract",e.RefactorInline="refactor.inline",e.RefactorRewrite="refactor.rewrite",e.Source="source",e.SourceOrganizeImports="source.organizeImports",e.SourceFixAll="source.fixAll"}(ue||(ue={})),function(e){function t(e,t){var n={diagnostics:e};return void 0!==t&&null!==t&&(n.only=t),n}function n(e){var t=e;return _e.defined(t)&&_e.typedArray(t.diagnostics,A.is)&&(void 0===t.only||_e.typedArray(t.only,_e.string))}e.create=t,e.is=n}(ce||(ce={})),function(e){function t(e,t,n){var r={title:e},i=!0;return"string"===typeof t?(i=!1,r.kind=t):I.is(t)?r.command=t:r.edit=t,i&&void 0!==n&&(r.kind=n),r}function n(e){var t=e;return t&&_e.string(t.title)&&(void 0===t.diagnostics||_e.typedArray(t.diagnostics,A.is))&&(void 0===t.kind||_e.string(t.kind))&&(void 0!==t.edit||void 0!==t.command)&&(void 0===t.command||I.is(t.command))&&(void 0===t.isPreferred||_e.boolean(t.isPreferred))&&(void 0===t.edit||j.is(t.edit))}e.create=t,e.is=n}(de||(de={})),function(e){function t(e,t){var n={range:e};return _e.defined(t)&&(n.data=t),n}function n(e){var t=e;return _e.defined(t)&&h.is(t.range)&&(_e.undefined(t.command)||I.is(t.command))}e.create=t,e.is=n}(ge||(ge={})),function(e){function t(e,t){return{tabSize:e,insertSpaces:t}}function n(e){var t=e;return _e.defined(t)&&_e.uinteger(t.tabSize)&&_e.boolean(t.insertSpaces)}e.create=t,e.is=n}(le||(le={})),function(e){function t(e,t,n){return{range:e,target:t,data:n}}function n(e){var t=e;return _e.defined(t)&&h.is(t.range)&&(_e.undefined(t.target)||_e.string(t.target))}e.create=t,e.is=n}(fe||(fe={})),function(e){function t(e,t){return{range:e,parent:t}}function n(t){var n=t;return void 0!==n&&h.is(n.range)&&(void 0===n.parent||e.is(n.parent))}e.create=t,e.is=n}(he||(he={})),function(e){function t(e,t,n,r){return new we(e,t,n,r)}function n(e){var t=e;return!!(_e.defined(t)&&_e.string(t.uri)&&(_e.undefined(t.languageId)||_e.string(t.languageId))&&_e.uinteger(t.lineCount)&&_e.func(t.getText)&&_e.func(t.positionAt)&&_e.func(t.offsetAt))}function r(e,t){for(var n=e.getText(),r=i(t,(function(e,t){var n=e.range.start.line-t.range.start.line;return 0===n?e.range.start.character-t.range.start.character:n})),o=n.length,a=r.length-1;a>=0;a--){var s=r[a],u=e.offsetAt(s.range.start),c=e.offsetAt(s.range.end);if(!(c<=o))throw new Error("Overlapping edit");n=n.substring(0,u)+s.newText+n.substring(c,n.length),o=u}return n}function i(e,t){if(e.length<=1)return e;var n=e.length/2|0,r=e.slice(0,n),o=e.slice(n);i(r,t),i(o,t);var a=0,s=0,u=0;while(a<r.length&&s<o.length){var c=t(r[a],o[s]);e[u++]=c<=0?r[a++]:o[s++]}while(a<r.length)e[u++]=r[a++];while(s<o.length)e[u++]=o[s++];return e}e.create=t,e.is=n,e.applyEdits=r}(pe||(pe={}));var _e,we=function(){function e(e,t,n,r){this._uri=e,this._languageId=t,this._version=n,this._content=r,this._lineOffsets=void 0}return Object.defineProperty(e.prototype,"uri",{get:function(){return this._uri},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"languageId",{get:function(){return this._languageId},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"version",{get:function(){return this._version},enumerable:!1,configurable:!0}),e.prototype.getText=function(e){if(e){var t=this.offsetAt(e.start),n=this.offsetAt(e.end);return this._content.substring(t,n)}return this._content},e.prototype.update=function(e,t){this._content=e.text,this._version=t,this._lineOffsets=void 0},e.prototype.getLineOffsets=function(){if(void 0===this._lineOffsets){for(var e=[],t=this._content,n=!0,r=0;r<t.length;r++){n&&(e.push(r),n=!1);var i=t.charAt(r);n="\r"===i||"\n"===i,"\r"===i&&r+1<t.length&&"\n"===t.charAt(r+1)&&r++}n&&t.length>0&&e.push(t.length),this._lineOffsets=e}return this._lineOffsets},e.prototype.positionAt=function(e){e=Math.max(Math.min(e,this._content.length),0);var t=this.getLineOffsets(),n=0,r=t.length;if(0===r)return f.create(0,e);while(n<r){var i=Math.floor((n+r)/2);t[i]>e?r=i:n=i+1}var o=n-1;return f.create(o,e-t[o])},e.prototype.offsetAt=function(e){var t=this.getLineOffsets();if(e.line>=t.length)return this._content.length;if(e.line<0)return 0;var n=t[e.line],r=e.line+1<t.length?t[e.line+1]:this._content.length;return Math.max(Math.min(n+e.character,r),n)},Object.defineProperty(e.prototype,"lineCount",{get:function(){return this.getLineOffsets().length},enumerable:!1,configurable:!0}),e}();(function(e){var t=Object.prototype.toString;function n(e){return"undefined"!==typeof e}function r(e){return"undefined"===typeof e}function i(e){return!0===e||!1===e}function o(e){return"[object String]"===t.call(e)}function a(e){return"[object Number]"===t.call(e)}function s(e,n,r){return"[object Number]"===t.call(e)&&n<=e&&e<=r}function u(e){return"[object Number]"===t.call(e)&&-2147483648<=e&&e<=2147483647}function c(e){return"[object Number]"===t.call(e)&&0<=e&&e<=2147483647}function d(e){return"[object Function]"===t.call(e)}function g(e){return null!==e&&"object"===typeof e}function l(e,t){return Array.isArray(e)&&e.every(t)}e.defined=n,e.undefined=r,e.boolean=i,e.string=o,e.number=a,e.numberRange=s,e.integer=u,e.uinteger=c,e.func=d,e.objectLiteral=g,e.typedArray=l})(_e||(_e={}));var ke=class{constructor(e,t,n){this._languageId=e,this._worker=t;const r=e=>{let t,n=e.getLanguageId();n===this._languageId&&(this._listener[e.uri.toString()]=e.onDidChangeContent((()=>{window.clearTimeout(t),t=window.setTimeout((()=>this._doValidate(e.uri,n)),500)})),this._doValidate(e.uri,n))},i=e=>{d.editor.setModelMarkers(e,this._languageId,[]);let t=e.uri.toString(),n=this._listener[t];n&&(n.dispose(),delete this._listener[t])};this._disposables.push(d.editor.onDidCreateModel(r)),this._disposables.push(d.editor.onWillDisposeModel(i)),this._disposables.push(d.editor.onDidChangeModelLanguage((e=>{i(e.model),r(e.model)}))),this._disposables.push(n((e=>{d.editor.getModels().forEach((e=>{e.getLanguageId()===this._languageId&&(i(e),r(e))}))}))),this._disposables.push({dispose:()=>{d.editor.getModels().forEach(i);for(let e in this._listener)this._listener[e].dispose()}}),d.editor.getModels().forEach(r)}_disposables=[];_listener=Object.create(null);dispose(){this._disposables.forEach((e=>e&&e.dispose())),this._disposables.length=0}_doValidate(e,t){this._worker(e).then((t=>t.doValidation(e.toString()))).then((n=>{const r=n.map((t=>ye(e,t)));let i=d.editor.getModel(e);i&&i.getLanguageId()===t&&d.editor.setModelMarkers(i,t,r)})).then(void 0,(e=>{console.error(e)}))}};function be(e){switch(e){case E.Error:return d.MarkerSeverity.Error;case E.Warning:return d.MarkerSeverity.Warning;case E.Information:return d.MarkerSeverity.Info;case E.Hint:return d.MarkerSeverity.Hint;default:return d.MarkerSeverity.Info}}function ye(e,t){let n="number"===typeof t.code?String(t.code):t.code;return{severity:be(t.severity),startLineNumber:t.range.start.line+1,startColumn:t.range.start.character+1,endLineNumber:t.range.end.line+1,endColumn:t.range.end.character+1,message:t.message,code:n,source:t.source}}var Ee=class{constructor(e,t){this._worker=e,this._triggerCharacters=t}get triggerCharacters(){return this._triggerCharacters}provideCompletionItems(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.doComplete(i.toString(),Ce(t)))).then((n=>{if(!n)return;const r=e.getWordUntilPosition(t),i=new d.Range(t.lineNumber,r.startColumn,t.lineNumber,r.endColumn),o=n.items.map((e=>{const t={label:e.label,insertText:e.insertText||e.label,sortText:e.sortText,filterText:e.filterText,documentation:e.documentation,detail:e.detail,command:Te(e.command),range:i,kind:Se(e.kind)};return e.textEdit&&(Ie(e.textEdit)?t.range={insert:Ae(e.textEdit.insert),replace:Ae(e.textEdit.replace)}:t.range=Ae(e.textEdit.range),t.insertText=e.textEdit.newText),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(Re)),e.insertTextFormat===B.Snippet&&(t.insertTextRules=d.languages.CompletionItemInsertTextRule.InsertAsSnippet),t}));return{isIncomplete:n.isIncomplete,suggestions:o}}))}};function Ce(e){if(e)return{character:e.column-1,line:e.lineNumber-1}}function xe(e){if(e)return{start:{line:e.startLineNumber-1,character:e.startColumn-1},end:{line:e.endLineNumber-1,character:e.endColumn-1}}}function Ae(e){if(e)return new d.Range(e.start.line+1,e.start.character+1,e.end.line+1,e.end.character+1)}function Ie(e){return"undefined"!==typeof e.insert&&"undefined"!==typeof e.replace}function Se(e){const t=d.languages.CompletionItemKind;switch(e){case X.Text:return t.Text;case X.Method:return t.Method;case X.Function:return t.Function;case X.Constructor:return t.Constructor;case X.Field:return t.Field;case X.Variable:return t.Variable;case X.Class:return t.Class;case X.Interface:return t.Interface;case X.Module:return t.Module;case X.Property:return t.Property;case X.Unit:return t.Unit;case X.Value:return t.Value;case X.Enum:return t.Enum;case X.Keyword:return t.Keyword;case X.Snippet:return t.Snippet;case X.Color:return t.Color;case X.File:return t.File;case X.Reference:return t.Reference}return t.Property}function Re(e){if(e)return{range:Ae(e.range),text:e.newText}}function Te(e){return e&&"editor.action.triggerSuggest"===e.command?{id:e.command,title:e.title,arguments:e.arguments}:void 0}var De=class{constructor(e){this._worker=e}provideHover(e,t,n){let r=e.uri;return this._worker(r).then((e=>e.doHover(r.toString(),Ce(t)))).then((e=>{if(e)return{range:Ae(e.range),contents:Fe(e.contents)}}))}};function Me(e){return e&&"object"===typeof e&&"string"===typeof e.kind}function Pe(e){return"string"===typeof e?{value:e}:Me(e)?"plaintext"===e.kind?{value:e.value.replace(/[\\`*_{}[\]()#+\-.!]/g,"\\$&")}:{value:e.value}:{value:"```"+e.language+"\n"+e.value+"\n```\n"}}function Fe(e){if(e)return Array.isArray(e)?e.map(Pe):[Pe(e)]}var Le=class{constructor(e){this._worker=e}provideDocumentHighlights(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.findDocumentHighlights(r.toString(),Ce(t)))).then((e=>{if(e)return e.map((e=>({range:Ae(e.range),kind:je(e.kind)})))}))}};function je(e){switch(e){case ne.Read:return d.languages.DocumentHighlightKind.Read;case ne.Write:return d.languages.DocumentHighlightKind.Write;case ne.Text:return d.languages.DocumentHighlightKind.Text}return d.languages.DocumentHighlightKind.Text}var Oe=class{constructor(e){this._worker=e}provideDefinition(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.findDefinition(r.toString(),Ce(t)))).then((e=>{if(e)return[Ne(e)]}))}};function Ne(e){return{uri:d.Uri.parse(e.uri),range:Ae(e.range)}}var Ue=class{constructor(e){this._worker=e}provideReferences(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.findReferences(i.toString(),Ce(t)))).then((e=>{if(e)return e.map(Ne)}))}},We=class{constructor(e){this._worker=e}provideRenameEdits(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.doRename(i.toString(),Ce(t),n))).then((e=>Ve(e)))}};function Ve(e){if(!e||!e.changes)return;let t=[];for(let n in e.changes){const r=d.Uri.parse(n);for(let i of e.changes[n])t.push({resource:r,versionId:void 0,textEdit:{range:Ae(i.range),text:i.newText}})}return{edits:t}}var He=class{constructor(e){this._worker=e}provideDocumentSymbols(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentSymbols(n.toString()))).then((e=>{if(e)return e.map((e=>({name:e.name,detail:"",containerName:e.containerName,kind:Ke(e.kind),range:Ae(e.location.range),selectionRange:Ae(e.location.range),tags:[]})))}))}};function Ke(e){let t=d.languages.SymbolKind;switch(e){case ie.File:return t.Array;case ie.Module:return t.Module;case ie.Namespace:return t.Namespace;case ie.Package:return t.Package;case ie.Class:return t.Class;case ie.Method:return t.Method;case ie.Property:return t.Property;case ie.Field:return t.Field;case ie.Constructor:return t.Constructor;case ie.Enum:return t.Enum;case ie.Interface:return t.Interface;case ie.Function:return t.Function;case ie.Variable:return t.Variable;case ie.Constant:return t.Constant;case ie.String:return t.String;case ie.Number:return t.Number;case ie.Boolean:return t.Boolean;case ie.Array:return t.Array}return t.Function}var ze=class{constructor(e){this._worker=e}provideLinks(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentLinks(n.toString()))).then((e=>{if(e)return{links:e.map((e=>({range:Ae(e.range),url:e.target})))}}))}},Xe=class{constructor(e){this._worker=e}provideDocumentFormattingEdits(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.format(r.toString(),null,$e(t)).then((e=>{if(e&&0!==e.length)return e.map(Re)}))))}},Be=class{constructor(e){this._worker=e}provideDocumentRangeFormattingEdits(e,t,n,r){const i=e.uri;return this._worker(i).then((e=>e.format(i.toString(),xe(t),$e(n)).then((e=>{if(e&&0!==e.length)return e.map(Re)}))))}};function $e(e){return{tabSize:e.tabSize,insertSpaces:e.insertSpaces}}var qe=class{constructor(e){this._worker=e}provideDocumentColors(e,t){const n=e.uri;return this._worker(n).then((e=>e.findDocumentColors(n.toString()))).then((e=>{if(e)return e.map((e=>({color:e.color,range:Ae(e.range)})))}))}provideColorPresentations(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getColorPresentations(r.toString(),t.color,xe(t.range)))).then((e=>{if(e)return e.map((e=>{let t={label:e.label};return e.textEdit&&(t.textEdit=Re(e.textEdit)),e.additionalTextEdits&&(t.additionalTextEdits=e.additionalTextEdits.map(Re)),t}))}))}},Qe=class{constructor(e){this._worker=e}provideFoldingRanges(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getFoldingRanges(r.toString(),t))).then((e=>{if(e)return e.map((e=>{const t={start:e.startLine+1,end:e.endLine+1};return"undefined"!==typeof e.kind&&(t.kind=Ge(e.kind)),t}))}))}};function Ge(e){switch(e){case k.Comment:return d.languages.FoldingRangeKind.Comment;case k.Imports:return d.languages.FoldingRangeKind.Imports;case k.Region:return d.languages.FoldingRangeKind.Region}}var Je=class{constructor(e){this._worker=e}provideSelectionRanges(e,t,n){const r=e.uri;return this._worker(r).then((e=>e.getSelectionRanges(r.toString(),t.map(Ce)))).then((e=>{if(e)return e.map((e=>{const t=[];while(e)t.push({range:Ae(e.range)}),e=e.parent;return t}))}))}};function Ye(e){const t=[],n=[],r=new N(e);t.push(r);const i=(...e)=>r.getLanguageServiceWorker(...e);function o(){const{languageId:t,modeConfiguration:r}=e;et(n),r.completionItems&&n.push(d.languages.registerCompletionItemProvider(t,new Ee(i,["/","-",":"]))),r.hovers&&n.push(d.languages.registerHoverProvider(t,new De(i))),r.documentHighlights&&n.push(d.languages.registerDocumentHighlightProvider(t,new Le(i))),r.definitions&&n.push(d.languages.registerDefinitionProvider(t,new Oe(i))),r.references&&n.push(d.languages.registerReferenceProvider(t,new Ue(i))),r.documentSymbols&&n.push(d.languages.registerDocumentSymbolProvider(t,new He(i))),r.rename&&n.push(d.languages.registerRenameProvider(t,new We(i))),r.colors&&n.push(d.languages.registerColorProvider(t,new qe(i))),r.foldingRanges&&n.push(d.languages.registerFoldingRangeProvider(t,new Qe(i))),r.diagnostics&&n.push(new ke(t,i,e.onDidChange)),r.selectionRanges&&n.push(d.languages.registerSelectionRangeProvider(t,new Je(i))),r.documentFormattingEdits&&n.push(d.languages.registerDocumentFormattingEditProvider(t,new Xe(i))),r.documentRangeFormattingEdits&&n.push(d.languages.registerDocumentRangeFormattingEditProvider(t,new Be(i)))}return o(),t.push(Ze(n)),Ze(t)}function Ze(e){return{dispose:()=>et(e)}}function et(e){while(e.length)e.pop().dispose()}}}]);