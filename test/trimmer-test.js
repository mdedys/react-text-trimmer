import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import should from 'should';
import 'should-sinon';
import Trimmer from '../src/trimmer';

Enzyme.configure({ adapter: new Adapter() });

describe( '<Trimmer/>', () => {

	it( 'should have default props set', () => {
		const wrapper = shallow( <Trimmer /> );
		wrapper.instance().props.className.should.equal('');
		wrapper.instance().props.textTail.should.equal('...');
		wrapper.instance().props.maxLines.should.equal(3);
	});

	it( 'should have className and textTail set properly when passed', () => {
		const className = 'testClassName';
		const textTail = 'abc';
		const maxLines = 1;

		const wrapper = shallow(
			<Trimmer className = {className} textTail = {textTail} maxLines = {maxLines}/>
		);

		wrapper.instance().props.className.should.equal(className);
		wrapper.instance().props.textTail.should.equal(textTail);
		wrapper.instance().props.maxLines.should.equal(maxLines);
	});

	it( 'should not trim any text', () => {

		const expectedText = 'Test String';

		const wrapper = mount(
			<Trimmer maxLines = {2}>
				{expectedText}
			</Trimmer>
		);


		wrapper.setState({ parentWidth: 200 });

		wrapper.text().trim().should.equal(expectedText);
	})

	it( 'should correctly trim to 1 line of text', () => {

		const wrapper = mount(
			<Trimmer maxLines = {1}>
				Some very long text that should be trimmed correctly when it is displayed.
				This text should be on one line.
			</Trimmer>
		);

		const expectedText = 'Some very long text that should...';

		wrapper.setState({ parentWidth: 200 });

		wrapper.text().trim().should.equal(expectedText);
	});

	it( 'should correctly trim to 5 lines of text', () => {
		const wrapper = mount(
			<Trimmer maxLines = {5}>
				Some very long text that should be trimmed corr when it is displayed.
				This text should be on 5 lines and should be truncated. 500s, when an unknown
				printer took a galley of type and scrambled it to make a type specimen book.
				It has survived not only five centuries, but also the leap into electronic
				typesetting, remaining essentially unchanged. It was popularised in the
				1960s with the release of Letraset sheets containing Lorem Ipsum
				passages, and more recently with desktop publishing software
				like Aldus PageMaker including versions of Lorem Ipsum.
			</Trimmer>
		);

		const expectedText = 'Some very long text that should be trimmed corr ' +
		'when it is displayed. This text should be on 5 lines and should be ' +
		'truncated. 500s, when an unknown printer took...'

		wrapper.setState({ parentWidth: 200 });

		wrapper.text().trim().should.equal(expectedText);

	})

});
